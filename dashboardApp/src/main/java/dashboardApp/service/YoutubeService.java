package dashboardApp.service;

import java.net.URI;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriTemplate;

@Service
public class YoutubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    private final String baseUrl = "https://youtube.googleapis.com/youtube/v3";

    public String getChannelId(String channelName) {
        String completeUrl = baseUrl + "/search?part=snippet&maxResults=1&q={channelName}&key={key}";

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(channelName, apiKey);
        String response = restTemplate.getForObject(url, String.class);

        System.out.println(response);

        return response;
    }    

    public String getSubscribers(String channelName) {
        return getChannelId(channelName);
    }
}
