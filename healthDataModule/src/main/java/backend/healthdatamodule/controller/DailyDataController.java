package backend.healthdatamodule.controller;

import backend.healthdatamodule.dto.DailyReportDto;
import backend.healthdatamodule.service.DailyDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/daily-data")
public class DailyDataController {

    @Autowired
    private DailyDataService dailyDataService;

    @PostMapping
    public ResponseEntity<Map<String, String>> saveDailyData(@RequestBody DailyReportDto report) {
        System.out.println("Primljen izveštaj: " + report.getEmployeeId() + " - " + report.getDate());
        report.getDailyFactors().forEach(f ->
                System.out.println(f.getName() + " = " + f.getValue())
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", "Daily report saved");

        return ResponseEntity.ok(response);
    }

}
