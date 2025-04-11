package app.todayplan.toplan.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import app.todayplan.toplan.dto.CalendarDto;
import app.todayplan.toplan.repository.CalendarRepository;

@Service
public class ToPlanService {
    
    private final CalendarRepository calendarRepository;

    public ToPlanService(CalendarRepository calendarRepository){
        this.calendarRepository = calendarRepository;
    }

    public List<CalendarDto> getCalendarList() {
        return calendarRepository.findAll().stream().map(CalendarDto::fromEntity).collect(Collectors.toList());
    }
}
