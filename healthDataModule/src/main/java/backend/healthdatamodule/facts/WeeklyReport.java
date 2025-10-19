package backend.healthdatamodule.facts;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class WeeklyReport {
    private Long employeeId;
    private LocalDate weekStart;
    private LocalDate weekEnd;
    private double avgWorkingHours;
    private int avgStressLevel;
    private double avgSleepHours;
    private double totalOvertimeHours;
    private double stressIncreaseLast3Weeks;
    private int overtimeIncreaseStreak;

    private String riskLevel;
    private String recommendation;
    private boolean managerNotificationNeeded;

    private List<String> activatedRules = new ArrayList<>();
}
