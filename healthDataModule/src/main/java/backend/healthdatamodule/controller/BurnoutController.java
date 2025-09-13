package backend.healthdatamodule.controller;

import backend.healthdatamodule.service.BurnoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/burnout")
public class BurnoutController {

    @Autowired
    private BurnoutService burnoutService;

    @PostMapping("/analyze")
    public String analyzeChainingRules(@RequestParam double stressLevel, @RequestParam double sleepHours){
        return burnoutService.getBurnoutRiskConclusion(stressLevel, sleepHours);
    }
}
