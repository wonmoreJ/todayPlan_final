package app.todayplan.toplan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.todayplan.toplan.domain.PlanEntity;
import app.todayplan.toplan.dto.CalendarDto;
import app.todayplan.toplan.dto.PlanDto;
import app.todayplan.toplan.service.PlanService;
import app.todayplan.toplan.service.ToPlanService;

@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
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

    @GetMapping("/planInfo")
    public PlanDto getPlanInfo(@RequestParam String userId, @RequestParam String planId) {
        PlanEntity entity = planService.getPlanInfo(userId, planId);
        return PlanDto.fromEntity(entity);
    }
    
    @DeleteMapping("/deleteplan/{boardId}")
    public ResponseEntity<Boolean> deletePlan(@PathVariable String boardId){
        boolean result = planService.deletePlan(boardId);
        return ResponseEntity.ok(result);
    }

}
