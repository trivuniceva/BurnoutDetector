package burnoutrulesengine.burnoutrulesengine.service;

import burnoutrulesengine.burnoutrulesengine.model.BurnoutRisk;
import burnoutrulesengine.burnoutrulesengine.model.DailyRecordFact;
import burnoutrulesengine.burnoutrulesengine.model.WeeklyRecordFact;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BurnoutRulesService {

    private final KieContainer kieContainer;

    @Autowired
    public BurnoutRulesService(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    public BurnoutRisk evaluateRisk(DailyRecordFact dailyFact) {
        KieSession kieSession = kieContainer.newKieSession("ksession-daily-rules");

        if (kieSession == null) {
            throw new IllegalStateException("KieSession 'ksession-daily-rules' nije pronađena! Proverite kmodule.xml.");
        }

        BurnoutRisk riskResult = new BurnoutRisk();
        kieSession.setGlobal("riskResult", riskResult);
        kieSession.insert(dailyFact);
        kieSession.fireAllRules();
        kieSession.dispose();

        return riskResult;
    }

    public BurnoutRisk evaluateWeeklyRisk(WeeklyRecordFact weeklyFact) {
        var kieBase = kieContainer.getKieBase("weeklyRulesKBase");
        KieSession kieSession = kieBase.newKieSession();

        if (kieSession == null) {
            throw new IllegalStateException("KieSession 'ksession-weekly-rules' nije pronađena!");
        }

        BurnoutRisk riskResult = new BurnoutRisk();
        kieSession.setGlobal("riskResult", riskResult);
        kieSession.insert(weeklyFact);
        kieSession.fireAllRules();
        kieSession.dispose();

        return riskResult;
    }

    public BurnoutRisk evaluateTrendRisk(List<WeeklyRecordFact> weeklyFacts) {
        KieSession kieSession = kieContainer.newKieSession("ksession-trend-rules");

        BurnoutRisk riskResult = new BurnoutRisk();
        kieSession.setGlobal("riskResult", riskResult);

        if (kieSession == null) {
            throw new IllegalStateException("KieSession 'ksession-trend-rules' nije pronađena! Proverite kmodule.xml.");
        }

        for (WeeklyRecordFact fact : weeklyFacts) {
            kieSession.insert(fact);
        }

        kieSession.fireAllRules();
        kieSession.dispose();

        return riskResult;
    }
}
