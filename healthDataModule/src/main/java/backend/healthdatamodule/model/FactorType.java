package backend.healthdatamodule.model;

import jakarta.persistence.*;

@Entity
@Table(name = "factor_types")
public class FactorType {

    // npr. id:1 = {name: "stres", unit: "2.3"}
    // ako studije recimo pokazu da postoji jos neki krivac u burnout-u samo se to dodaje u bazu
    // ne menja se logika ili slicno
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String unit;

    public FactorType() {
    }
}
