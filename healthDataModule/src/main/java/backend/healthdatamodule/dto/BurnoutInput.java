package backend.healthdatamodule.dto;

public class BurnoutInput {
    private double workingHours;
    private double stressLevel;
    private double sleepHours;
    private String riskLevel; // this will be set by drools
    private String recommendation; // this will be set by drools

    public BurnoutInput(double workingHours, double stressLevel, double sleepHours) {
        this.workingHours = workingHours;
        this.stressLevel = stressLevel;
        this.sleepHours = sleepHours;
    }

    public double getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(double workingHours) {
        this.workingHours = workingHours;
    }

    public double getStressLevel() {
        return stressLevel;
    }

    public void setStressLevel(double stressLevel) {
        this.stressLevel = stressLevel;
    }

    public double getSleepHours() {
        return sleepHours;
    }

    public void setSleepHours(double sleepHours) {
        this.sleepHours = sleepHours;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }
}
