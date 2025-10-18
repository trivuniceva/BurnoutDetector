package backend.healthdatamodule.facts;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class WeeklyReport {
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;

    private double avgWorkingHours;
    private double avgStressLevel;
    private double totalOvertimeHours;
    private double stressIncreaseLast3Weeks;
    private int overtimeIncreaseStreak;
    private int riskLevel = 0; // 0-low, 1-medium, 2-high
    private List<String> recommendations = new ArrayList<>();
    private double sleep;

}
