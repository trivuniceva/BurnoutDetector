package backend.healthdatamodule.controller;

import backend.healthdatamodule.facts.WeeklyReport;
import backend.healthdatamodule.service.DailyDataService;
import backend.healthdatamodule.service.WeeklyReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/weekly-reports")
public class WeeklyReportController {

    @Autowired
    private WeeklyReportService weeklyReportService;

    @GetMapping("/weekly/{employeeId}")
    public ResponseEntity<WeeklyReport> getWeeklyReport(
            @PathVariable Long employeeId,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        WeeklyReport report = weeklyReportService.calculateWeeklyReport(employeeId, start, end);
        return ResponseEntity.ok(report);
    }

}

