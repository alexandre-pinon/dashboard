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
    
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DataLoader(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if ((this.userRepository.findByEmail("apinon0205@gmail.com")) == null) {
            User alex = new User("Alexandre", "Pinon", "apinon0205@gmail.com", "123456");
            alex.setEnabled(true);
		    alex.setPassword(bCryptPasswordEncoder.encode(alex.getPassword()));
            this.userRepository.save(alex);
        }
    }
}
