package dashboardApp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboardApp.db.User;
import dashboardApp.db.WidgetInstance;
import dashboardApp.security.CustomUserDetails;
import dashboardApp.service.UserService;
import dashboardApp.service.WeatherService;
import dashboardApp.service.WidgetInstanceService;
import dashboardApp.service.YoutubeService;

@RestController
@RequestMapping("/api")
public class WidgetController {

    @Autowired
    WidgetInstanceService widgetInstanceService;
    @Autowired
    UserService userService;
    @Autowired
    YoutubeService youtubeService;

    // @GetMapping("/weather")
    // public ResponseEntity<String> getWeather(Principal principal) {
    //     System.out.println("EHE TE NANDAYO ?!!");
    //     System.out.println(principal.getName());
    //     String city = "Paris"; // DB USER PARAM
    //     return WeatherService.getWeather(city);
    // }

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

    @GetMapping("/youtube/youtube_1/{widgetInstanceId}")
    public ResponseEntity<String> getSubscribers(@PathVariable Long widgetInstanceId, Principal principal) {
        Optional<WidgetInstance> instance = widgetInstanceService.getWidgetInstanceById(widgetInstanceId);
        String channelName = "";
        if (!instance.isEmpty()) {
            channelName = instance.get().getStringParams().get("channel_name");
        } else {
            System.out.println("INCORRECT WIDGET INSTANCE ID!");
        }

        return youtubeService.getSubscribers(channelName);
    }

    @GetMapping("/youtube/youtube_2/{widgetInstanceId}")
    public ResponseEntity<String> getNumberOfViews(@PathVariable Long widgetInstanceId, Principal principal) {
        Optional<WidgetInstance> instance = widgetInstanceService.getWidgetInstanceById(widgetInstanceId);
        String videoName = "";
        if (!instance.isEmpty()) {
            videoName = instance.get().getStringParams().get("video_name");
        } else {
            System.out.println("INCORRECT WIDGET INSTANCE ID!");
        }

        return youtubeService.getNumberOfViews(videoName);
    }

    @PostMapping("/create")
    public String postWeather(@RequestBody WidgetInstance widgetInstance, Principal principal) {
        CustomUserDetails userDetails = (CustomUserDetails) userService.loadUserByUsername(principal.getName());
        User user = userDetails.getUser();
        widgetInstance.setUser(user);
        widgetInstanceService.createNewInstance(widgetInstance);

        return "redirect:/home";
    }

    @PutMapping("/update/{widgetInstanceId}")
    public String putWeather(@PathVariable Long widgetInstanceId, @RequestBody WidgetInstance widgetInstance) {
        widgetInstanceService.updateInstanceById(widgetInstanceId, widgetInstance.getStringParams(), widgetInstance.getIntParams());
        return "redirect:/home";
    }

    @DeleteMapping("/delete/{widgetInstanceId}")
    public String deleteWeather(@PathVariable Long widgetInstanceId) {
        widgetInstanceService.deleteInstanceById(widgetInstanceId);
        return "redirect:/home";
    }

    @GetMapping("/widgetInstances")
    public List<WidgetInstance> getWidgetInstances(Principal principal) {
        CustomUserDetails userDetails = (CustomUserDetails) userService.loadUserByUsername(principal.getName());
        User user = userDetails.getUser();
        List<WidgetInstance> widgetInstances = widgetInstanceService.getInstancesByUser(user);
        return widgetInstances;
    }
}
