package backend.healthdatamodule.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class EmployeeRuleResult {
    private Long employeeId;
    private String riskLevel;
    private String recommendation;
    private boolean managerNotificationNeeded;
    private List<String> activatedRules;
}
