package backend.healthdatamodule.controller;

import backend.healthdatamodule.facts.WeeklyReport;
import backend.healthdatamodule.dto.WeeklyReportDto;
import backend.healthdatamodule.service.DailyDataService;
import backend.healthdatamodule.service.BurnoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/weekly-reports")
public class WeeklyReportController {

    @Autowired
    private DailyDataService dailyDataService;

    @Autowired
    private BurnoutService burnoutService;

    @GetMapping("/{employeeId}")
    public WeeklyReportDto getWeeklyReport(
            @PathVariable Long employeeId,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        if (startDate == null) {
            startDate = LocalDate.now().minusDays(7); // default poslednjih 7 dana
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }

        WeeklyReport report = dailyDataService.calculateWeeklyReport(employeeId, startDate, endDate);

        // poziv Drools da izračuna burnout i preporuke

        double burnoutRisk = burnoutService.evaluateBurnout(
                employeeId,
                startDate,
                endDate,
                report.getAvgStressLevel(),
                report.getAvgWorkingHours()
        );


        List<String> recommendations = burnoutService.getRecommendations(
                employeeId,
                startDate,
                endDate,
                report.getAvgStressLevel(),
                report.getAvgWorkingHours() // ili neka druga metrike koja opisuje san/rad
        );


        WeeklyReportDto dto = new WeeklyReportDto();
        dto.setEmployeeId(report.getEmployeeId());
        dto.setStartDate(report.getStartDate());
        dto.setEndDate(report.getEndDate());
        dto.setAvgWorkingHours(report.getAvgWorkingHours());
        dto.setAvgStressLevel(report.getAvgStressLevel());
        dto.setRiskLevel(burnoutRisk);

        // mapiranje preporuka u DTO
        var recDtoList = new ArrayList<WeeklyReportDto.RecommendationDto>();

        /*recommendations.forEach(r -> {
            WeeklyReportDto.RecommendationDto rdto = new WeeklyReportDto.RecommendationDto();
            rdto.setTitle("Preporuka"); // pošto je r String, nema r.getTitle()
            rdto.setText(r); // r je tekst preporuke
            rdto.setRiskLevel("medium"); // možeš hardkodirati ili dodati logiku ako želiš
            recDtoList.add(rdto);
        });*/
        dto.setRecommendations(recDtoList);


        return dto;
    }
}

