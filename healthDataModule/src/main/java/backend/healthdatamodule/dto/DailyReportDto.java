package backend.healthdatamodule.dto;

import java.time.LocalDate;
import java.util.List;

public class DailyReportDto {
    private Long employeeId;
    private LocalDate date;
    private List<FactorDto> dailyFactors;

    public DailyReportDto() {
    }

    public DailyReportDto(Long employeeId, LocalDate date, List<FactorDto> dailyFactors) {
        this.employeeId = employeeId;
        this.date = date;
        this.dailyFactors = dailyFactors;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<FactorDto> getDailyFactors() {
        return dailyFactors;
    }

    public void setDailyFactors(List<FactorDto> dailyFactors) {
        this.dailyFactors = dailyFactors;
    }

    @Override
    public String toString() {
        return "DailyReportDto{" +
                "employeeId=" + employeeId +
                ", date=" + date +
                ", dailyFactors=" + dailyFactors +
                '}';
    }
}
