package dashboardApp.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboardApp.service.WeatherService;

@RestController
@RequestMapping("/api")
public class WidgetController {

    @GetMapping("/weather")
    public ResponseEntity<String> getWeather(Principal principal) {
        System.out.println("EHE TE NANDAYO ?!!");
        System.out.println(principal.getName());
        String city = "Paris"; // DB USER PARAM
        return WeatherService.getWeather(city);
    }

    @GetMapping("/weather/{widgetInstanceId}")
    public ResponseEntity<String> getWeather(@PathVariable int widgetInstanceId, Principal principal) {
        System.out.println("EHE TE NANDAYO ?!!");
        System.out.println(widgetInstanceId);
        String city = "Paris"; // DB USER PARAM
        return WeatherService.getWeather(city);
    }
}
