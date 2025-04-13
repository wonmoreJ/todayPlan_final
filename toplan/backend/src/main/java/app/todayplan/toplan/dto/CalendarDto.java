package app.todayplan.toplan.dto;

import java.time.LocalDate;

import app.todayplan.toplan.domain.CalendarEntity;
import lombok.Getter;

@Getter
public class CalendarDto {
    private int calendarId;
    private String fullDate;
    private int year;
    private int month;
    private int day;
    private String week;
    private String enWeek;
    private String holidayYn;
    private String holidayName;
    private LocalDate dt;

    public CalendarDto (int calendarId, String fullDate, int year, int month, int day, String week, String enWeek, String holidayYn, String holidayName, LocalDate dt) {
        this.calendarId = calendarId;
        this.fullDate = fullDate;
        this.year = year;
        this.month = month;
        this.day = day;
        this.week = week;
        this.enWeek = enWeek;
        this.holidayYn = holidayYn;
        this.holidayName = holidayName;
        this.dt = dt;
    }
    
    public static CalendarDto fromEntity(CalendarEntity e) {
        String fullDate = String.format("%04d-%02d-%02d (%s)", e.getYear(), e.getMonth(), e.getDay(),e.getWeek());
        return new CalendarDto(
            e.getCalendarId(),
            fullDate,
            e.getYear(),
            e.getMonth(),
            e.getDay(),
            e.getWeek(),
            e.getEnWeek(),
            e.getHolidayYn(),
            e.getHolidayName(),
            e.getDt()
        );
    }
}
