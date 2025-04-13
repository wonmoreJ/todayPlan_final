package app.todayplan.toplan.domain;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "CALENDAR")
public class CalendarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CALENDAR_ID")
    private Integer calendarId;

    @Column(name = "YEAR")
    private Integer year;

    @Column(name = "MONTH")
    private Integer month;

    @Column(name = "DAY")
    private Integer day;

    @Column(name = "WEEK")
    private String week;

    @Column(name = "EN_WEEK")
    private String enWeek;

    @Column(name = "HOLIDAY_YN")
    private String holidayYn;

    @Column(name = "HOLIDAY_NAME")
    private String holidayName;

    @Column(name = "DT")
    private LocalDate dt;

    // 👉 기본 생성자 필수 (JPA용)
    public CalendarEntity() {}

    // 👉 생성자, getter, setter는 필요에 따라 추가
    public Integer getCalendarId() {
        return calendarId;
    }

    public void setCalendarId(Integer calendarId) {
        this.calendarId = calendarId;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getEnWeek() {
        return enWeek;
    }

    public void setEnWeek(String enWeek) {
        this.enWeek = enWeek;
    }

    public String getHolidayYn() {
        return holidayYn;
    }

    public void setHolidayYn(String holidayYn) {
        this.holidayYn = holidayYn;
    }

    public String getHolidayName() {
        return holidayName;
    }

    public void setHolidayName(String holidayName) {
        this.holidayName = holidayName;
    }

    public LocalDate getDt() {
        return dt;
    }

    public void setDt(LocalDate dt) {
        this.dt = dt;
    }
}
