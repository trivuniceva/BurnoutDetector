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
    @JoinColumn(name = "daily_record_id")
    private DailyRecord dailyRecordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "factor_type_id")
    private FactorType factorTypeId;

    public DailyFactor() {}
}
