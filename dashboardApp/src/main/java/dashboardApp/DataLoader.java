package dashboardApp;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import dashboardApp.db.User;
import dashboardApp.db.UserRepository;
import dashboardApp.db.WidgetInstance;
import dashboardApp.db.WidgetInstanceRepository;

@Component
public class DataLoader implements ApplicationRunner {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private WidgetInstanceRepository widgetInstanceRepository;

    @Override
    public void run(ApplicationArguments args) {
        if ((userRepository.findByEmail("admin@admin.com")) == null) {
            User admin = new User("admin", "admin", "admin@admin.com", "admin");
            admin.setEnabled(true);
		    admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
            userRepository.save(admin);
        }
        User admin = userRepository.findByEmail("admin@admin.com");
        if ((widgetInstanceRepository.findByUser(admin).isEmpty())) {
            HashMap<String, String> stringParams = new HashMap<>();
            stringParams.put("city", "Paris");
            WidgetInstance meteo11 = new WidgetInstance(
                "weather_1",
                "weather",
                "Display temperature for a city",
                1,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(meteo11);

            stringParams = new HashMap<>();
            stringParams.put("city", "London");
            WidgetInstance meteo12 = new WidgetInstance(
                "weather_1",
                "weather",
                "Display temperature for a city",
                2,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(meteo12);

            stringParams = new HashMap<>();
            stringParams.put("city", "Paris");
            WidgetInstance meteo21 = new WidgetInstance(
                "weather_2",
                "weather",
                "Display position and wind for a city",
                3,
                stringParams,
                null,
                admin
            );
            widgetInstanceRepository.save(meteo21);
        }
    }
}
