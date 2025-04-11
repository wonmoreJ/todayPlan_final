package app.todayplan.toplan.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PLAN")
@Getter
@Setter
@NoArgsConstructor
public class PlanEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "PLAN_ID", length = 200)
    private String planId;

    @OneToOne
    @JoinColumn(name = "BOARD_ID", referencedColumnName = "BOARD_ID")
    private BoardEntity board;

    @Column(name = "TITLE", length = 200)
    private String title;

    @Column(name = "COMMIT_CHK", length = 1)
    private String commitChk;

    @Column(name = "CONTENT", length = 500)
    private String content;

    @Column(name = "BACK_COLOR", length = 100)
    private String backColor;

    @Column(name = "STRT_DT")
    private LocalDate strtDt;

    @Column(name = "END_DT")
    private LocalDate endDt;

}
