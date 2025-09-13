package backend.healthdatamodule.model;

import jakarta.persistence.*;

@Entity
@Table(name = "daily_factors")
public class DailyFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "daily_record_id", nullable = false)
    private DailyRecord dailyRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "factor_type_id", nullable = false)
    private FactorType factorType;

    public DailyFactor() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }

    public DailyRecord getDailyRecord() { return dailyRecord; }
    public void setDailyRecord(DailyRecord dailyRecord) { this.dailyRecord = dailyRecord; }

    public FactorType getFactorType() { return factorType; }
    public void setFactorType(FactorType factorType) { this.factorType = factorType; }
}
