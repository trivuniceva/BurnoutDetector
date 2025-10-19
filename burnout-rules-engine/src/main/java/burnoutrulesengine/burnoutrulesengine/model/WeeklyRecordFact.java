package burnoutrulesengine.burnoutrulesengine.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WeeklyRecordFact {
    private Long employeeId;
    private double avgWorkingHours;
    private int avgStressLevel;
    private double avgSleepHours;
    private double totalOvertimeHours;
    private double stressIncreaseLast3Weeks;
    private int overtimeIncreaseStreak;

    private int symptomsCount;
    private boolean hasFatigueAndConcentrationLoss;
    private int sickDays;

}

