package burnoutrulesengine.burnoutrulesengine.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Koristi se kao Globalni objekat u Drools sesiji
@Getter
@Setter
@NoArgsConstructor
public class BurnoutRisk {
    private String riskLevel; // 'Nizak', 'Srednji', 'Visok'
    private String recommendation;
    private boolean managerNotificationNeeded;
}
