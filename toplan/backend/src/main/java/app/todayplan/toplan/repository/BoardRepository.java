package app.todayplan.toplan.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import app.todayplan.toplan.domain.BoardEntity;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    Optional<BoardEntity> findByBoardId(String boardId);
} 