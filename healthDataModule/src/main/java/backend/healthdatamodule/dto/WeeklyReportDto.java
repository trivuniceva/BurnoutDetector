package backend.healthdatamodule.dto;

import java.time.LocalDate;
import java.util.List;

public class WeeklyReportDto {
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private double avgWorkingHours;
    private double avgStressLevel;
    private double riskLevel; // 0-1 vrednost
    private List<RecommendationDto> recommendations;


    public static class RecommendationDto {
        private String title;
        private String text;
        private String riskLevel; // low, medium, high
    }

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

    public double getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(double riskLevel) {
        this.riskLevel = riskLevel;
    }

    public List<RecommendationDto> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<RecommendationDto> recommendations) {
        this.recommendations = recommendations;
    }
}
