package backend.healthdatamodule.service;

import backend.healthdatamodule.facts.WeeklyReport;
import backend.healthdatamodule.model.DailyRecord;
import backend.healthdatamodule.repository.DailyRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WeeklyReportService {

    @Autowired
    private DailyRecordRepository dailyRecordRepository;

    public WeeklyReport calculateWeeklyReport(Long employeeId, LocalDate weekStart, LocalDate weekEnd) {
        List<DailyRecord> records = dailyRecordRepository.findAllByEmployeeIdAndDateBetween(employeeId, weekStart, weekEnd);

        WeeklyReport report = new WeeklyReport();
        report.setEmployeeId(employeeId);
        report.setStartDate(weekStart);
        report.setEndDate(weekEnd);

        double avgWorkingHours = records.stream()
                .mapToDouble(r -> getFactorValue(r, "workingHours"))
                .average()
                .orElse(0);

        double avgStress = records.stream()
                .mapToDouble(r -> getFactorValue(r, "stressLevel"))
                .average()
                .orElse(0);

        double avgSleep = records.stream()
                .mapToDouble(r -> getFactorValue(r, "sleepHours"))
                .average()
                .orElse(0);

        report.setAvgWorkingHours(avgWorkingHours);
        report.setAvgStressLevel(avgStress);
        report.setSleep(avgSleep);

        return report;
    }

    private double getFactorValue(DailyRecord record, String factorName) {
        return record.getDailyFactors().stream()
                .filter(f -> f.getFactorType().getName().equals(factorName))
                .map(f -> f.getValue() != null ? Double.parseDouble(f.getValue()) : 0)
                .findFirst()
                .orElse(0.0);
    }
}
