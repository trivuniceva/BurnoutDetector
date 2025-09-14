package backend.healthdatamodule.repository;

import backend.healthdatamodule.model.FactorType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FactorTypeRepository extends JpaRepository<FactorType, Long> {

    Optional<FactorType> findByName(String name);
}