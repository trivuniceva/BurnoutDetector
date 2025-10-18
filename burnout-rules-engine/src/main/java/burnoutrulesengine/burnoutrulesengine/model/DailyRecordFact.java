package burnoutrulesengine.burnoutrulesengine.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DailyRecordFact {
    private Long employeeId;
    private String date;
    private double workingHours;
    private int stressLevel; // 0-10
    private double sleepHours;
    private String physicalActivity;
    private String symptoms;
}
