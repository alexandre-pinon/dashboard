package dashboardApp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import dashboardApp.service.UserService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private UserService userService;
    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Override
	protected void configure(HttpSecurity http) throws Exception {

		http.authorizeRequests()
            .antMatchers("/sign-up/**", "/sign-in/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
                .loginPage("/sign-in")
                .permitAll()
            .and()
            .oauth2Login()
                .loginPage("/sign-in");
    }
    
    @Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/h2-console/**");
    }
    
    @Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService)
			.passwordEncoder(bCryptPasswordEncoder);
	}
}
