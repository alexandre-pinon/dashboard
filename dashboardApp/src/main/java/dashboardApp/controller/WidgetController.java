package dashboardApp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboardApp.db.User;
import dashboardApp.db.WidgetInstance;
import dashboardApp.security.CustomUserDetails;
import dashboardApp.service.UserService;
import dashboardApp.service.WeatherService;
import dashboardApp.service.WidgetInstanceService;

@RestController
@RequestMapping("/api")
public class WidgetController {

    @Autowired
    WidgetInstanceService widgetInstanceService;
    @Autowired
    UserService userService;

    @GetMapping("/weather")
    public ResponseEntity<String> getWeather(Principal principal) {
        System.out.println("EHE TE NANDAYO ?!!");
        System.out.println(principal.getName());
        String city = "Paris"; // DB USER PARAM
        return WeatherService.getWeather(city);
    }

    @GetMapping("/weather/{widgetInstanceId}")
    public ResponseEntity<String> getWeather(@PathVariable Long widgetInstanceId, Principal principal) {
        Optional<WidgetInstance> instance = widgetInstanceService.getWidgetInstanceById(widgetInstanceId);
        String city = "";
        if (!instance.isEmpty()) {
            city = instance.get().getStringParams().get("city");
        } else {
            System.out.println("INCORRECT WIDGET INSTANCE ID!");
        }

        return WeatherService.getWeather(city);
    }

    @GetMapping("/widgetInstances")
    public List<WidgetInstance> getWidgetInstances(Principal principal) {
        CustomUserDetails userDetails = (CustomUserDetails) userService.loadUserByUsername(principal.getName());
        User user = userDetails.getUser();
        List<WidgetInstance> widgetInstances = widgetInstanceService.getInstancesByUser(user);
        if (!widgetInstances.isEmpty()) {
            for (WidgetInstance instance : widgetInstances) {
                System.out.println("ID = " + instance.getId());
                System.out.println("Params = " + instance.getStringParams());
            }
        }
        return widgetInstances;
    }
}
