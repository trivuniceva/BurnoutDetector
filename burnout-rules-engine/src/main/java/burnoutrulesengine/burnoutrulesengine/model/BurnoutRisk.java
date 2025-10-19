package burnoutrulesengine.burnoutrulesengine.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BurnoutRisk {
//    private String riskLevel; // 'Nizak', 'Srednji', 'Visok'
    private String riskLevel = "Nizak";
    private String recommendation;
    private boolean managerNotificationNeeded;

    private List<String> activatedRules = new ArrayList<>();

}
