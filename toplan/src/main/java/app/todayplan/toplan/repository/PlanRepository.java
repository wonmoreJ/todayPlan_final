package app.todayplan.toplan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import app.todayplan.toplan.domain.PlanEntity;

public interface PlanRepository extends JpaRepository<PlanEntity, Long>{
    List<PlanEntity> findPlansByBoard_UserId(String userId);
}
