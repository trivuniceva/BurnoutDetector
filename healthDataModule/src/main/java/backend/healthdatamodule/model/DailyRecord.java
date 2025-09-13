package backend.healthdatamodule.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "daily_records")
public class DailyRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private LocalDate date;

    @OneToMany(mappedBy = "dailyRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DailyFactor> dailyFactors;


    public DailyRecord() {}

    public DailyRecord(Long employeeId, LocalDate date) {
        this.employeeId = employeeId;
        this.date = date;
        this.dailyFactors = new ArrayList<>();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<DailyFactor> getDailyFactors() {
        return dailyFactors;
    }

    public void setDailyFactors(List<DailyFactor> dailyFactors) {
        this.dailyFactors = dailyFactors;
    }
}
