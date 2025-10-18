package burnoutrulesengine.burnoutrulesengine.service;

import burnoutrulesengine.burnoutrulesengine.model.BurnoutRisk;
import burnoutrulesengine.burnoutrulesengine.model.DailyRecordFact;
import burnoutrulesengine.burnoutrulesengine.model.WeeklyRecordFact;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            throw new IllegalStateException("KieSession 'ksession-rules' nije pronađena!");
        }

        BurnoutRisk riskResult = new BurnoutRisk();
        kieSession.setGlobal("riskResult", riskResult);
        kieSession.insert(dailyFact);
        kieSession.fireAllRules();
        kieSession.dispose();

        return riskResult;
    }

    public BurnoutRisk evaluateWeeklyRisk(WeeklyRecordFact weeklyFact) {
        KieSession kieSession = kieContainer.newKieSession("ksession-weekly-rules");

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
}
