package backend.healthdatamodule.controller;

import backend.healthdatamodule.dto.DailyReportDto;
import backend.healthdatamodule.service.DailyDataService;
import burnoutrulesengine.burnoutrulesengine.model.BurnoutRisk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/daily-data")
public class DailyDataController {

    @Autowired
    private DailyDataService dailyDataService;

    @PostMapping
    public ResponseEntity<BurnoutRisk> processDailyData(@RequestBody DailyReportDto report) {
        System.out.println("Primljen izveštaj: " + report.getEmployeeId() + " - " + report.getDate());

        BurnoutRisk riskResult = dailyDataService.processDailyReport(report);

        return ResponseEntity.ok(riskResult);
    }

    @GetMapping("/{employeeId}/{date}")
    public ResponseEntity<?> getDailyReport(@PathVariable Long employeeId,
                                            @PathVariable String date){
        DailyReportDto report = dailyDataService.getDailyReport(employeeId, LocalDate.parse(date));
        return ResponseEntity.ok(report);

    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<?> getAllReports(@PathVariable Long employeeId){
        return ResponseEntity.ok(dailyDataService.getAllReports(employeeId));
    }

}
