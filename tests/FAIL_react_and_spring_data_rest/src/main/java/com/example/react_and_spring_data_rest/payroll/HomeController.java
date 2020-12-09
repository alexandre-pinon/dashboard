package com.example.react_and_spring_data_rest.payroll;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
