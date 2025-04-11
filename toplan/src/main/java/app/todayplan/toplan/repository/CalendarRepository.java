package app.todayplan.toplan.repository;

import app.todayplan.toplan.domain.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<CalendarEntity, Long> {
}