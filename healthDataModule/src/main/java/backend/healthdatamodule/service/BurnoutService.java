package backend.healthdatamodule.service;

import backend.healthdatamodule.dto.BurnoutInput;
import backend.healthdatamodule.facts.Action;
import backend.healthdatamodule.facts.HighStress;
import backend.healthdatamodule.facts.ShortSleep;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BurnoutService {

    @Autowired
    private KieContainer kieContainer;

    public String getBurnoutRiskConclusion(double stressLevel, double sleepHours){
        KieSession kieSession = kieContainer.newKieSession();

        try {
            if(stressLevel >= 8){
                kieSession.insert(new HighStress());
            }
            if(sleepHours < 6){
                kieSession.insert(new ShortSleep());
            }

            kieSession.fireAllRules();
            boolean hasHighRiskAction = kieSession.getObjects().stream()
                    .anyMatch(obj -> obj instanceof Action);

            if(hasHighRiskAction){
                return "high risk - emergency action triggered";
            } else {
                return "risk is not high based on the chained rule";
            }

        } finally {
            kieSession.dispose();
        }

    }
}
