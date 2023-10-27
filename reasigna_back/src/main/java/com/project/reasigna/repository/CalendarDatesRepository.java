package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.reasigna.models.CalendarDates;
import com.project.reasigna.models.Gtfs;

public interface CalendarDatesRepository extends JpaRepository<CalendarDates, Long> {

    List<CalendarDates> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

}
