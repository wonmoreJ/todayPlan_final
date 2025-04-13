package app.todayplan.toplan.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import app.todayplan.toplan.domain.PlanEntity;
import app.todayplan.toplan.domain.BoardEntity;
import app.todayplan.toplan.dto.PlanDto;
import app.todayplan.toplan.repository.PlanRepository;
import app.todayplan.toplan.repository.BoardRepository;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final BoardRepository boardRepository;
    
    public PlanService(PlanRepository planRepository,BoardRepository boardRepository){
        this.planRepository = planRepository;
        this.boardRepository = boardRepository;
    }

    public List<PlanDto> getPlanList(String userId){
        List<PlanEntity> plans = planRepository.findPlansByBoard_UserId(userId);
        return plans.stream().map(PlanDto::fromEntity).collect(Collectors.toList());
    }

    public PlanEntity getPlanInfo(String userId, String planId){
        PlanEntity result = planRepository.findByPlanIdAndBoard_UserId(planId,userId).orElseThrow(() -> new NoSuchElementException("해당플랜없음"));
        return result;
    }

    public boolean deletePlan(String boardId){
        Optional<BoardEntity> boardOpt = boardRepository.findByBoardId(boardId);

        if(boardOpt.isPresent()){
            boardRepository.delete(boardOpt.get());
            return true;
        }else{
            return false;
        }
    }

    public boolean createBoardWithPlan(Map<String, Object> insertData){
        try {
            //1.Board 저장
            BoardEntity board = new BoardEntity();
            String userId = (String)insertData.get("userId");
            board.setUserId(userId);
            boardRepository.save(board);

            //2.Board 세팅
            String boardId = "board_" + board.getId();
            String dataDt = (String)insertData.get("dt");
            LocalDate dt = LocalDate.parse(dataDt);
            board.setBoardId(boardId);
            board.setDt(dt);
            boardRepository.save(board); //update

            //3.Plan 저장
            PlanEntity plan = new PlanEntity();
            String planId = "plan_" + board.getId();
        
            plan.setPlanId(planId);
            plan.setBoard(board);
            plan.setTitle((String)insertData.get("title"));
            plan.setCommitChk("N");
            plan.setContent((String)insertData.get("content"));
            plan.setBackColor("white");
            plan.setStrtDt(dt);
            plan.setEndDt(dt);
            PlanEntity saved = planRepository.save(plan);

            return saved != null;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
