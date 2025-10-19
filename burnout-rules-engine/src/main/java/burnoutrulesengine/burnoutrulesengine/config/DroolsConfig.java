package burnoutrulesengine.burnoutrulesengine.config;

import org.kie.api.KieServices;
import org.kie.api.builder.*;
import org.kie.api.runtime.KieContainer;
import org.kie.api.builder.Message.Level;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.kie.internal.io.ResourceFactory;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
public class DroolsConfig {

    private static final String KMODULE_LOCATION = "META-INF/kmodule.xml";

    @Bean
    public KieContainer kieContainer() {
        try {
            KieServices kieServices = KieServices.Factory.get();
            KieFileSystem kieFileSystem = kieServices.newKieFileSystem();

            kieFileSystem.write(ResourceFactory.newClassPathResource(KMODULE_LOCATION, "UTF-8"));

            loadRules(kieFileSystem, "rules/daily");
            loadRules(kieFileSystem, "rules/weekly");
            loadRules(kieFileSystem, "rules/accumulate");
            loadRules(kieFileSystem, "rules/cep");

            KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem).buildAll();

            if (kieBuilder.getResults().hasMessages(Level.ERROR)) {
                throw new RuntimeException("Drools build greška: " + kieBuilder.getResults().getMessages());
            }

            ReleaseId releaseId = kieBuilder.getKieModule().getReleaseId();
            return kieServices.newKieContainer(releaseId);

        } catch (Exception e) {
            throw new RuntimeException("Greška prilikom kreiranja KieContainer-a", e);
        }
    }

    private void loadRules(KieFileSystem kieFileSystem, String path) {
        try {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            var resources = resolver.getResources("classpath*:" + path + "/**/*.drl");

            for (var resource : resources) {
                String filePath = path + "/" + resource.getFilename();
                kieFileSystem.write(ResourceFactory.newClassPathResource(filePath, "UTF-8"));
            }
        } catch (Exception e) {
            throw new RuntimeException("Greška prilikom učitavanja pravila iz: " + path, e);
        }
    }
}
