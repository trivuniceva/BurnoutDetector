package backend.healthdatamodule.service;

import backend.healthdatamodule.dto.BurnoutInput;
import backend.healthdatamodule.facts.Action;
import backend.healthdatamodule.facts.HighStress;
import backend.healthdatamodule.facts.ShortSleep;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    public double evaluateBurnout(Long employeeId, LocalDate startDate, LocalDate endDate,
                                  double avgStress, double avgSleepHours) {
        KieSession kieSession = kieContainer.newKieSession();
        try {
            if(avgStress >= 7.0){
                kieSession.insert(new HighStress());
            }
            if(avgSleepHours < 6.0){
                kieSession.insert(new ShortSleep());
            }

            kieSession.fireAllRules();
            boolean hasHighRiskAction = kieSession.getObjects().stream()
                    .anyMatch(obj -> obj instanceof Action);

            return hasHighRiskAction ? 0.9 : 0.3; // vraća broj između 0 i 1 za frontend
        } finally {
            kieSession.dispose();
        }
    }

    public List<String> getRecommendations(Long employeeId, LocalDate startDate, LocalDate endDate,
                                           double avgStress, double avgSleepHours) {
        List<String> recommendations = new ArrayList<>();

        KieSession kieSession = kieContainer.newKieSession();
        try {
            // ubaci "fakte" u Drools
            if(avgStress >= 7.0){
                kieSession.insert(new HighStress());
                recommendations.add("Vaš nivo stresa je visok, razmotrite odmor i tehniku opuštanja.");
            }

            if(avgSleepHours < 6.0){
                kieSession.insert(new ShortSleep());
                recommendations.add("Nedovoljno spavate, pokušajte da povećate trajanje sna.");
            }

            kieSession.fireAllRules();

            // primer kako možeš dodati dodatnu preporuku iz Drools pravila
            boolean hasHighRiskAction = kieSession.getObjects().stream()
                    .anyMatch(obj -> obj instanceof Action);
            if(hasHighRiskAction){
                recommendations.add("Hitna akcija je potrebna zbog visokog rizika od burnout-a.");
            }

        } finally {
            kieSession.dispose();
        }

        return recommendations;
    }
}
