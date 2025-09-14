package backend.healthdatamodule.service;

import backend.healthdatamodule.dto.BurnoutInput;
import backend.healthdatamodule.dto.DailyReportDto;
import backend.healthdatamodule.repository.DailyRecordRepository;
import backend.healthdatamodule.repository.FactorTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DailyDataService {

    @Autowired
    private BurnoutService burnoutService;

    @Autowired
    private DailyRecordRepository dailyRecordRepository;

    @Autowired
    private FactorTypeRepository factorTypeRepository;


    @Transactional
    public BurnoutInput processDailyReport(DailyReportDto dailyReportDto) {

        System.out.println(dailyReportDto.toString());
        return null;
    }
}
