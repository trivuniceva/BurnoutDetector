package backend.healthdatamodule.service;

import backend.healthdatamodule.facts.WeeklyReport;
import backend.healthdatamodule.model.DailyRecord;
import backend.healthdatamodule.repository.DailyRecordRepository;
import burnoutrulesengine.burnoutrulesengine.model.BurnoutRisk;
import burnoutrulesengine.burnoutrulesengine.model.DailyRecordFact;
import burnoutrulesengine.burnoutrulesengine.model.WeeklyRecordFact;
import burnoutrulesengine.burnoutrulesengine.service.BurnoutRulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WeeklyReportService {

    @Autowired
    private DailyRecordRepository dailyRecordRepository;

    @Autowired
    private BurnoutRulesService burnoutRulesService;

    public BurnoutRisk analyzeWeeklyRisk(Long employeeId, LocalDate weekStart, LocalDate weekEnd) {
        WeeklyRecordFact fact = calculateWeeklyFact(employeeId, weekStart, weekEnd);
        if (fact == null) {
            throw new IllegalArgumentException("Nema podataka za nedelju!");
        }
        return burnoutRulesService.evaluateWeeklyRisk(fact);
    }

    public WeeklyRecordFact calculateWeeklyFact(Long employeeId, LocalDate weekStart, LocalDate weekEnd) {
        List<DailyRecord> records = dailyRecordRepository
                .findByEmployeeIdAndDateBetween(employeeId, weekStart, weekEnd);

        if (records.isEmpty()) {
            return null;
        }

        double avgWorkingHours = records.stream()
                .mapToDouble(r -> getFactorValue(r, "workingHours"))
                .average().orElse(0);

        double avgStress = records.stream()
                .mapToDouble(r -> getFactorValue(r, "stressLevel"))
                .average().orElse(0);

        double avgSleep = records.stream()
                .mapToDouble(r -> getFactorValue(r, "sleepHours"))
                .average().orElse(0);

        double totalOvertime = records.stream()
                .mapToDouble(r -> Math.max(0, getFactorValue(r, "workingHours") - 8))
                .sum();

        double stressIncrease = calculateStressIncrease(employeeId, weekStart);

        WeeklyRecordFact fact = new WeeklyRecordFact();
        fact.setEmployeeId(employeeId);
        fact.setAvgWorkingHours(avgWorkingHours);
        fact.setAvgStressLevel((int) Math.round(avgStress));
        fact.setAvgSleepHours(avgSleep);
        fact.setTotalOvertimeHours(totalOvertime);
        fact.setStressIncreaseLast3Weeks(stressIncrease);
        fact.setOvertimeIncreaseStreak(checkOvertimeStreak(employeeId));

        return fact;
    }

    public WeeklyReport calculateWeeklyReport(Long employeeId, LocalDate startDate, LocalDate endDate) {
        // 1. Napravi WeeklyRecordFact iz dnevnih zapisa
        WeeklyRecordFact fact = calculateWeeklyFact(employeeId, startDate, endDate);
        if (fact == null) {
            throw new IllegalArgumentException("Nema podataka za ovu nedelju!");
        }

        // 2. Pozovi Drools engine da proceni rizik
        BurnoutRisk risk = burnoutRulesService.evaluateWeeklyRisk(fact);

        // 3. Napravi WeeklyReport DTO i upiši rezultate
        WeeklyReport report = new WeeklyReport();
        report.setEmployeeId(employeeId);
        report.setWeekStart(startDate);
        report.setWeekEnd(endDate);
        report.setAvgWorkingHours(fact.getAvgWorkingHours());
        report.setAvgStressLevel(fact.getAvgStressLevel());
        report.setAvgSleepHours(fact.getAvgSleepHours());
        report.setTotalOvertimeHours(fact.getTotalOvertimeHours());
        report.setStressIncreaseLast3Weeks(fact.getStressIncreaseLast3Weeks());
        report.setOvertimeIncreaseStreak(fact.getOvertimeIncreaseStreak());
        report.setRiskLevel(risk.getRiskLevel());
        report.setRecommendation(risk.getRecommendation());
        report.setManagerNotificationNeeded(risk.isManagerNotificationNeeded());

        return report;
    }


    private double getFactorValue(DailyRecord record, String factorName) {
        return record.getDailyFactors().stream()
                .filter(f -> f.getFactorType().getName().equals(factorName))
                .map(f -> f.getValue() != null ? Double.parseDouble(f.getValue()) : 0)
                .findFirst()
                .orElse(0.0);
    }

    private double calculateStressIncrease(Long employeeId, LocalDate weekStart) {
        LocalDate prevStart = weekStart.minusWeeks(2);
        LocalDate prevEnd = weekStart.minusDays(1);

        List<DailyRecord> prevRecords = dailyRecordRepository
                .findByEmployeeIdAndDateBetween(employeeId, prevStart, prevEnd);
        if (prevRecords.isEmpty()) return 0;

        double prevAvgStress = prevRecords.stream()
                .mapToDouble(r -> getFactorValue(r, "stressLevel"))
                .average().orElse(0);

        List<DailyRecord> currentRecords = dailyRecordRepository
                .findByEmployeeIdAndDateBetween(employeeId, weekStart, weekStart.plusDays(6));

        double currentAvgStress = currentRecords.stream()
                .mapToDouble(r -> getFactorValue(r, "stressLevel"))
                .average().orElse(0);

        return currentAvgStress - prevAvgStress;
    }


    private int checkOvertimeStreak(Long employeeId) {
        // samo primer logike
        return 2; // npr. ako su 2 uzastopne nedelje imali >10h prekovremenog
    }

}
