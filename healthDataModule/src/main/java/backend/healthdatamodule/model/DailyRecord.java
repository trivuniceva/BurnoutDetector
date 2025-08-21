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

}
