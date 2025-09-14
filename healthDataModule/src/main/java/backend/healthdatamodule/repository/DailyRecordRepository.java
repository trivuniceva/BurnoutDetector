package backend.healthdatamodule.repository;

import backend.healthdatamodule.model.DailyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyRecordRepository extends JpaRepository<DailyRecord, Long> {
}