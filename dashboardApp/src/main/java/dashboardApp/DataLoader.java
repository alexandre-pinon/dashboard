package dashboardApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import dashboardApp.db.User;
import dashboardApp.db.UserRepository;

@Component
public class DataLoader implements ApplicationRunner {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        if ((userRepository.findByEmail("apinon0205@gmail.com")) == null) {
            User alex = new User("Alexandre", "Pinon", "apinon0205@gmail.com", "123456");
            alex.setEnabled(true);
		    alex.setPassword(bCryptPasswordEncoder.encode(alex.getPassword()));
            userRepository.save(alex);
        }
    }
}
