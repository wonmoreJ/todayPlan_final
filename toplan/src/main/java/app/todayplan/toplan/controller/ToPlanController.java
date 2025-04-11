package app.todayplan.toplan.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.todayplan.toplan.dto.CalendarDto;
import app.todayplan.toplan.dto.PlanDto;
import app.todayplan.toplan.service.PlanService;
import app.todayplan.toplan.service.ToPlanService;

@RestController
@RequestMapping("/api")
public class ToPlanController {
    private final ToPlanService toplanService;
    private final PlanService planService;

    public ToPlanController(ToPlanService toplanService, PlanService planService){
        this.toplanService = toplanService;
        this.planService = planService;
    }

    @GetMapping("/cal")
    public List<CalendarDto> getCalendarList() {
        return toplanService.getCalendarList();
    }

    @GetMapping("/plan")
    public List<PlanDto> getPlan(@RequestParam String userId){
        return planService.getPlanList(userId);
    }
}
