package dashboardApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dashboardApp.db.User;
import dashboardApp.db.WidgetInstance;
import dashboardApp.db.WidgetInstanceRepository;

@Service
public class WidgetInstanceService {
    
    @Autowired
    WidgetInstanceRepository widgetInstanceRepository;

    public Optional<WidgetInstance> getWidgetInstanceById(Long id) {
        return widgetInstanceRepository.findById(id);
    }

    public List<WidgetInstance> getInstancesByUser(User user) {
        return widgetInstanceRepository.findByUser(user);
    }

}
