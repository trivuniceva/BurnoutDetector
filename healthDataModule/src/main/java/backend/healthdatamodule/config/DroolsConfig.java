package backend.healthdatamodule.config;

import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieModule;
import org.kie.api.runtime.KieContainer;
import org.kie.internal.io.ResourceFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DroolsConfig {

    private static final String RULES_PATH = "classpath*:/rules/"; // Putanja do foldera sa pravilima

    @Bean
    public KieContainer kieContainer() {
        KieServices ks = KieServices.Factory.get();
        KieFileSystem kfs = ks.newKieFileSystem();

        kfs.write(ResourceFactory.newClassPathResource("rules/forward-chaining/simple-risk-rules.drl"));
        kfs.write(ResourceFactory.newClassPathResource("rules/forward-chaining/burnout-chaining-rules.drl"));

        KieBuilder kb = ks.newKieBuilder(kfs);
        kb.buildAll();
        KieModule km = kb.getKieModule();
        return ks.newKieContainer(km.getReleaseId());
    }
}