package app.todayplan.toplan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.todayplan.toplan.domain.PlanEntity;

public interface PlanRepository extends JpaRepository<PlanEntity, Long>{
    List<PlanEntity> findPlansByBoard_UserId(String userId);
    Optional<PlanEntity> findByPlanIdAndBoard_UserId(String planId, String userId);
}
