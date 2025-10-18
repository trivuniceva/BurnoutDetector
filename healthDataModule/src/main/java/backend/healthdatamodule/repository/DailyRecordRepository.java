package backend.healthdatamodule.repository;

import backend.healthdatamodule.model.DailyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyRecordRepository extends JpaRepository<DailyRecord, Long> {
    @Query("SELECT dr FROM DailyRecord dr LEFT JOIN FETCH dr.dailyFactors df LEFT JOIN FETCH df.factorType WHERE dr.employeeId = :employeeId AND dr.date = :date")
    Optional<DailyRecord> findByEmployeeIdAndDate(@Param("employeeId") Long employeeId, @Param("date") LocalDate date);

    List<DailyRecord> findAllByEmployeeId(Long employeeId);

    List<DailyRecord> findAllByEmployeeIdAndDateBetween(Long employeeId, LocalDate weekStart, LocalDate weekEnd);
}
