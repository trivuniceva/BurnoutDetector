package backend.healthdatamodule.facts;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public double getAvgWorkingHours() {
        return avgWorkingHours;
    }

    public void setAvgWorkingHours(double avgWorkingHours) {
        this.avgWorkingHours = avgWorkingHours;
    }

    public double getAvgStressLevel() {
        return avgStressLevel;
    }

    public void setAvgStressLevel(double avgStressLevel) {
        this.avgStressLevel = avgStressLevel;
    }

    public double getTotalOvertimeHours() {
        return totalOvertimeHours;
    }

    public void setTotalOvertimeHours(double totalOvertimeHours) {
        this.totalOvertimeHours = totalOvertimeHours;
    }

    public double getStressIncreaseLast3Weeks() {
        return stressIncreaseLast3Weeks;
    }

    public void setStressIncreaseLast3Weeks(double stressIncreaseLast3Weeks) {
        this.stressIncreaseLast3Weeks = stressIncreaseLast3Weeks;
    }

    public int getOvertimeIncreaseStreak() {
        return overtimeIncreaseStreak;
    }

    public void setOvertimeIncreaseStreak(int overtimeIncreaseStreak) {
        this.overtimeIncreaseStreak = overtimeIncreaseStreak;
    }

    public int getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(int riskLevel) {
        this.riskLevel = riskLevel;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<String> recommendations) {
        this.recommendations = recommendations;
    }
}
