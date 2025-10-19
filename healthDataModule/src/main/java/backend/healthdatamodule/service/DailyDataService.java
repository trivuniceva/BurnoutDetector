package backend.healthdatamodule.service;

import backend.healthdatamodule.dto.DailyReportDto;
import backend.healthdatamodule.dto.FactorDto;
import backend.healthdatamodule.model.DailyFactor;
import backend.healthdatamodule.model.DailyRecord;
import backend.healthdatamodule.model.FactorType;
import backend.healthdatamodule.repository.DailyRecordRepository;
import backend.healthdatamodule.repository.FactorTypeRepository;
import burnoutrulesengine.burnoutrulesengine.model.BurnoutRisk;
import burnoutrulesengine.burnoutrulesengine.model.DailyRecordFact;
import burnoutrulesengine.burnoutrulesengine.service.BurnoutRulesService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class DailyDataService {

    @Autowired
    private BurnoutRulesService burnoutRulesService;

    @Autowired
    private DailyRecordRepository dailyRecordRepository;

    @Autowired
    private FactorTypeRepository factorTypeRepository;

    @Transactional
    public BurnoutRisk processDailyReport(DailyReportDto dailyReportDto) {

        DailyRecord recordToSave = createDailyRecordFromDto(dailyReportDto);

        DailyRecord dailyRecord = dailyRecordRepository.save(recordToSave);

        DailyRecordFact droolsFact = convertToDroolsFact(dailyRecord);

        BurnoutRisk riskResult = burnoutRulesService.evaluateRisk(droolsFact);

        return riskResult;
    }

    private DailyRecord createDailyRecordFromDto(DailyReportDto dto) {
        DailyRecord record = new DailyRecord();
        record.setEmployeeId(dto.getEmployeeId());
        record.setDate(dto.getDate() != null ? dto.getDate() : LocalDate.now());

        List<DailyFactor> factors = dto.getDailyFactors().stream().map(factorDto -> {

            Optional<FactorType> factorTypeOptional = factorTypeRepository.findByName(factorDto.getName());

            FactorType factorType = factorTypeOptional.orElseGet(() -> {
                FactorType newType = new FactorType();
                newType.setName(factorDto.getName());
                return newType;
            });

            DailyFactor dailyFactor = new DailyFactor();
            dailyFactor.setFactorType(factorType);
            dailyFactor.setValue((String) factorDto.getValue());
            dailyFactor.setDailyRecord(record);
            return dailyFactor;

        }).collect(Collectors.toList());

        record.setDailyFactors(factors);
        return record;
    }

    private DailyRecordFact convertToDroolsFact(DailyRecord record) {
        DailyRecordFact fact = new DailyRecordFact();

        fact.setEmployeeId(record.getEmployeeId());

        fact.setWorkingHours(getFactorDoubleValue(record, "workingHours"));
        fact.setStressLevel(getFactorIntValue(record, "stressLevel"));
        fact.setSleepHours(getFactorDoubleValue(record, "sleepHours"));

        return fact;
    }

    private int getFactorIntValue(DailyRecord record, String factorName) {
        return record.getDailyFactors().stream()
                .filter(f -> f.getFactorType().getName().equals(factorName))
                .map(f -> {
                    try {
                        return f.getValue() != null ? Integer.parseInt(f.getValue()) : 0; // parsiranje kao int
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .findFirst()
                .orElse(0);
    }

    private double getFactorDoubleValue(DailyRecord record, String factorName) {
        return record.getDailyFactors().stream()
                .filter(f -> f.getFactorType().getName().equals(factorName))
                .map(f -> {
                    try {
                        return f.getValue() != null ? Double.parseDouble(f.getValue()) : 0.0; // parsiranje kao double
                    } catch (NumberFormatException e) {
                        return 0.0;
                    }
                })
                .findFirst()
                .orElse(0.0);
    }


    public DailyReportDto getDailyReport(Long employeeId, LocalDate date) {
        DailyRecord record = dailyRecordRepository.findByEmployeeIdAndDate(employeeId, date)
                .orElse(null);

        if(record == null)
            return null;

        DailyReportDto dto = new DailyReportDto();
        dto.setEmployeeId(employeeId);
        dto.setDate(date);

        dto.setDailyFactors(
                record.getDailyFactors().stream()
                        .<FactorDto>map(f -> new FactorDto(f.getFactorType().getName(), f.getValue()))
                        .collect(Collectors.toList())
        );

        return dto;
    }

    public List<DailyReportDto> getAllReports(Long employeeId) {
        List<DailyRecord> records = dailyRecordRepository.findAllByEmployeeId(employeeId);

        return records.stream().map(record -> {
            DailyReportDto dto = new DailyReportDto();
            dto.setEmployeeId(employeeId);
            dto.setDate(record.getDate());

            dto.setDailyFactors(
                    record.getDailyFactors().stream()
                            .map(f -> new FactorDto(f.getFactorType().getName(), f.getValue()))
                            .collect(Collectors.toList())
            );
            return dto;
        }).collect(Collectors.toList());
    }



}