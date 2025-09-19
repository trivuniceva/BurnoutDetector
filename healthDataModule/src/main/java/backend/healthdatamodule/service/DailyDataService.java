package backend.healthdatamodule.service;

import backend.healthdatamodule.dto.BurnoutInput;
import backend.healthdatamodule.dto.DailyReportDto;
import backend.healthdatamodule.dto.FactorDto;
import backend.healthdatamodule.model.DailyFactor;
import backend.healthdatamodule.model.DailyRecord;
import backend.healthdatamodule.model.FactorType;
import backend.healthdatamodule.repository.DailyRecordRepository;
import backend.healthdatamodule.repository.FactorTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DailyDataService {

    @Autowired
    private BurnoutService burnoutService;

    @Autowired
    private DailyRecordRepository dailyRecordRepository;

    @Autowired
    private FactorTypeRepository factorTypeRepository;

    @Transactional
    public void processDailyReport(DailyReportDto dailyReportDto) {

        Long employeeId = dailyReportDto.getEmployeeId();
        LocalDate date = dailyReportDto.getDate();

        DailyRecord dailyRecord = dailyRecordRepository.findByEmployeeIdAndDate(employeeId, date)
                .orElseGet(() -> new DailyRecord(employeeId, date));

        if (dailyRecord.getDailyFactors() == null) {
            dailyRecord.setDailyFactors(new ArrayList<>());
        } else {
            dailyRecord.getDailyFactors().clear();
        }

        for (FactorDto f : dailyReportDto.getDailyFactors()) {

            FactorType factorType = factorTypeRepository.findByName(f.getName())
                    .orElseGet(() -> {
                        FactorType newType = new FactorType();
                        newType.setName(f.getName());
                        newType.setUnit(null);
                        return factorTypeRepository.save(newType);
                    });

            DailyFactor dailyFactor = new DailyFactor();
            dailyFactor.setDailyRecord(dailyRecord);
            dailyFactor.setFactorType(factorType);

            if (f.getValue() != null) {
                String value = f.getValue() != null ? f.getValue().toString() : null;
                dailyFactor.setValue(value);

            } else {
                dailyFactor.setValue(null);
            }

            dailyRecord.getDailyFactors().add(dailyFactor);
        }

        dailyRecordRepository.save(dailyRecord);
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
                        .map(f -> new FactorDto(f.getFactorType().getName(), f.getValue()))
                        .toList()
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
