package dashboardApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboardApp.service.WeatherService;

@RestController
@RequestMapping("/api")
public class WidgetController {

    @GetMapping("/weather")
    public ResponseEntity<String> getWeather(String city) {
        city = "Paris"; // DB USER PARAM
        return WeatherService.getWeather(city);
    }
}
