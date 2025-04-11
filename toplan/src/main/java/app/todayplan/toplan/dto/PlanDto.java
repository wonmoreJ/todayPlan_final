package app.todayplan.toplan.dto;

import java.time.LocalDate;

import app.todayplan.toplan.domain.PlanEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlanDto {
    private String planId;
    private String boardId;
    private String title;
    private String commitChk;
    private String content;
    private String backColor;
    private LocalDate strtDt;
    private LocalDate endDt;
    private String userId;

    // Entity → DTO 변환용 정적 메서드
    public static PlanDto fromEntity(PlanEntity entity) {
        return new PlanDto(
            entity.getPlanId(),
            entity.getBoard().getBoardId(),
            entity.getTitle(),
            entity.getCommitChk(),
            entity.getContent(),
            entity.getBackColor(),
            entity.getStrtDt(),
            entity.getEndDt(),
            entity.getBoard().getUserId()
        );
    }
}
