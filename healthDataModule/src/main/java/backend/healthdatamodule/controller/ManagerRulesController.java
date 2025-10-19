package backend.healthdatamodule.controller;

import backend.healthdatamodule.service.ManagerRulesService;
import burnoutrulesengine.burnoutrulesengine.model.BurnoutRisk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "*")
public class ManagerRulesController {

    private final ManagerRulesService managerRulesService;

    @Autowired
    public ManagerRulesController(ManagerRulesService managerRulesService) {
        this.managerRulesService = managerRulesService;
    }

    @PostMapping("/analyze-team-risk")
    public Map<String, Integer> analyzeTeamRisk(@RequestBody List<BurnoutRisk> allRisks) {
        return managerRulesService.analyzeTeamRisk(allRisks);
    }

    @PostMapping("/team-risk-summary")
    public Map<String, Integer> getTeamRiskSummary(@RequestBody List<BurnoutRisk> risks) {
        return managerRulesService.analyzeTeamRisk(risks);
    }

}
