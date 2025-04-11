package app.todayplan.toplan.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "BOARD")
@Setter
@NoArgsConstructor
public class BoardEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "BOARD_ID", unique = true, length = 100) // ✅ 이거 꼭 있어야 해!
    private String boardId;

    @Column(name = "USER_ID", length = 50)
    private String userId;

    @Column(name = "DT")
    private LocalDate dt;

    @OneToOne(mappedBy = "board")
    private PlanEntity plan;

    public Integer getId() {
        return id;
    }
    
    public String getBoardId() {
        return boardId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public LocalDate getDt() {
        return dt;
    }
    
    public PlanEntity getPlan() {
        return plan;
    }
}