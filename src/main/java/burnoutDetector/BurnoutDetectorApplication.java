package burnoutDetector;

import backend.healthdatamodule.HealthDataModuleApplication;
import notificationsModule.NotificationsModuleApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import reportsModule.ReportsModuleApplication;
import userManagement.UserManagementApplication;

@SpringBootApplication
@Import({UserManagementApplication.class, HealthDataModuleApplication.class, NotificationsModuleApplication.class, ReportsModuleApplication.class})
public class BurnoutDetectorApplication {

    public static void main(String[] args) {
        SpringApplication.run(BurnoutDetectorApplication.class, args);
    }

}
