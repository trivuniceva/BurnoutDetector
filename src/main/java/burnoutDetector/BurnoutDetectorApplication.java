package burnoutDetector;

import backend.healthdatamodule.HealthDataModuleApplication;
import burnoutrulesengine.burnoutrulesengine.config.DroolsConfig;
import notificationsModule.NotificationsModuleApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import reportsModule.ReportsModuleApplication;
import userManagement.UserManagementApplication;

@SpringBootApplication
@Import({
        UserManagementApplication.class,
        NotificationsModuleApplication.class,
        ReportsModuleApplication.class,
        HealthDataModuleApplication.class, // Vraćamo ga u Import listu

        // KRITIČNO: Ostavljamo SAMO ispravnu Drools konfiguraciju
        DroolsConfig.class
})
// Ciljano skeniramo samo našu glavnu aplikaciju i RULES ENGINE paket.
// Ne skeniramo zdravstveni modul, jer je uvezen putem @Import.
@ComponentScan(basePackages = {
        "burnoutDetector",
        "burnoutrulesengine.burnoutrulesengine.service" // Skeniraj samo Service iz Drools modula
})public class BurnoutDetectorApplication {

    public static void main(String[] args) {
        SpringApplication.run(BurnoutDetectorApplication.class, args);
    }

}
