package dashboardApp.service;

import java.net.URI;

import javax.annotation.PostConstruct;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

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
        String channelId = null;

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(channelName, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(response.getBody());
            channelId = root.path("items").get(0).at("/id/channelId").asText();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("ERROR CHANNEL NOT FOUND");
        }

        return channelId;
    }    

    public ResponseEntity<String> getSubscribers(String channelName) {
        String completeUrl = baseUrl + "/channels?part=statistics&id={channelId}&key={key}";
        String channelId = getChannelId(channelName);

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(channelId, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response;
    }

    public ResponseEntity<String> getNumberOfViews(String videoName) {
        String completeUrl = baseUrl + "/channels?part=statistics&id={channelId}&key={key}";
        String channelId = getChannelId(videoName);

        UriTemplate uriTemplate = new UriTemplate(completeUrl);
        RestTemplate restTemplate = new RestTemplate();

        URI url = uriTemplate.expand(channelId, apiKey);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response;
    }
}
