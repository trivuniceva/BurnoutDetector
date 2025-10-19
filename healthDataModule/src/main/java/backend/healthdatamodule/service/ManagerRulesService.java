package backend.healthdatamodule.service;

import backend.healthdatamodule.dto.EmployeeRuleResult;
import burnoutrulesengine.burnoutrulesengine.model.BurnoutRisk;
import burnoutrulesengine.burnoutrulesengine.model.WeeklyRecordFact;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ManagerRulesService {

    private final KieContainer kieContainer;

    @Autowired
    public ManagerRulesService(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    public Map<String, Integer> analyzeTeamRisk(List<BurnoutRisk> allRisks) {
        KieSession session = kieContainer.newKieSession("ksession-manager-rules");
        Map<String, Integer> stats = new HashMap<>();
        session.setGlobal("riskStats", stats);
        for (BurnoutRisk risk : allRisks) session.insert(risk);
        session.fireAllRules();
        session.dispose();
        return stats;
    }

    public EmployeeRuleResult analyzeEmployeeRisk(BurnoutRisk risk, List<WeeklyRecordFact> facts) {
        KieSession session = kieContainer.newKieSession("ksession-manager-rules");

        List<String> activatedRules = new ArrayList<>();
        session.setGlobal("riskResult", risk);
        session.setGlobal("activatedRules", activatedRules);

        for (WeeklyRecordFact f : facts) session.insert(f);

        session.fireAllRules();
        session.dispose();

        EmployeeRuleResult result = new EmployeeRuleResult();
        result.setEmployeeId(risk.getEmployeeId());
        result.setRiskLevel(risk.getRiskLevel());
        result.setRecommendation(risk.getRecommendation());
        result.setActivatedRules(activatedRules);

        return result;
    }


}


