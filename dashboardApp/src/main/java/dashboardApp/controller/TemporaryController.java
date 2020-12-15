package dashboardApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TemporaryController {

    // TEMPORARY ROUTE
    @GetMapping("/sign-in")
	public String signIn() {
		return "sign-in";
    }
    @GetMapping("/sign-up")
	public String signUp() {
		return "sign-up";
	}
}
