package app.todayplan.toplan.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import app.todayplan.toplan.domain.PlanEntity;
import app.todayplan.toplan.dto.PlanDto;
import app.todayplan.toplan.repository.PlanRepository;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository){
        this.planRepository = planRepository;
    }

    public List<PlanDto> getPlanList(String userId){
        List<PlanEntity> plans = planRepository.findPlansByBoard_UserId(userId);
        return plans.stream().map(PlanDto::fromEntity).collect(Collectors.toList());
    }

    public PlanEntity getPlanInfo(String userId, String planId){
        System.out.println("쿼리실행전");
        PlanEntity result = planRepository.findByPlanIdAndBoard_UserId(planId,userId).
        orElseThrow(() -> new NoSuchElementException("해당플랜없음"));
        System.out.println("쿼리실행후");
        return result;
    }
}
