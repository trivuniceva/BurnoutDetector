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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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

        WeeklyRecordFact currentWeekFact = calculateWeeklyFact(employeeId, startDate, endDate);
        if (currentWeekFact == null) {
            throw new IllegalArgumentException("Nema podataka za ovu nedelju!");
        }

        BurnoutRisk weeklyRisk = burnoutRulesService.evaluateWeeklyRisk(currentWeekFact);

        List<WeeklyRecordFact> trendFacts = getLastFourWeeklyFacts(employeeId, endDate);

        BurnoutRisk trendRisk = burnoutRulesService.evaluateTrendRisk(trendFacts);

        BurnoutRisk finalRisk = combineRisks(weeklyRisk, trendRisk);


        WeeklyReport report = new WeeklyReport();
        report.setAvgWorkingHours(currentWeekFact.getAvgWorkingHours());
        report.setAvgStressLevel(currentWeekFact.getAvgStressLevel());
        report.setAvgSleepHours(currentWeekFact.getAvgSleepHours());
        report.setRiskLevel(finalRisk.getRiskLevel());
        report.setRecommendation(finalRisk.getRecommendation());
        report.setManagerNotificationNeeded(finalRisk.isManagerNotificationNeeded());

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

    public List<WeeklyRecordFact> getLastFourWeeklyFacts(Long employeeId, LocalDate currentWeekEnd) {
        List<WeeklyRecordFact> facts = new ArrayList<>();

        LocalDate endDate = currentWeekEnd;
        for (int i = 0; i < 4; i++) {
            LocalDate startDate = endDate.minusDays(6);

            WeeklyRecordFact fact = calculateWeeklyFact(employeeId, startDate, endDate);

            if (fact != null) {
                facts.add(fact);
            }
            endDate = startDate.minusDays(1);
        }

        Collections.reverse(facts);
        return facts;
    }

    private BurnoutRisk combineRisks(BurnoutRisk r1, BurnoutRisk r2) {
        String r1LevelStr = (r1.getRiskLevel() == null) ? "Nizak" : r1.getRiskLevel();
        String r2LevelStr = (r2.getRiskLevel() == null) ? "Nizak" : r2.getRiskLevel();

        Map<String, Integer> riskOrder = Map.of("Nizak", 1, "Srednji", 2, "Visok", 3);

        int r1Level = riskOrder.getOrDefault(r1LevelStr, 0);
        int r2Level = riskOrder.getOrDefault(r2LevelStr, 0);

        if (r2Level > r1Level) {
            return r2;
        } else if (r1Level > r2Level) {
            return r1;
        } else {
            r1.setManagerNotificationNeeded(r1.isManagerNotificationNeeded() || r2.isManagerNotificationNeeded());
            return r1;
        }
    }

    private int calculateSymptomsCount(Long employeeId, LocalDate weekStart, LocalDate weekEnd) {
        List<DailyRecord> records = dailyRecordRepository
                .findByEmployeeIdAndDateBetween(employeeId, weekStart, weekEnd);

        long symptomsReportedDays = records.stream()
                .filter(r -> getFactorValue(r, "physicalSymptoms") > 0)
                .count();

        return (int) symptomsReportedDays;
    }


}
