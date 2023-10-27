package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.reasigna.models.Calendar;
import com.project.reasigna.models.Gtfs;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    Calendar findByserviceId(String service_id);

    List<Calendar> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

    Calendar findByserviceIdAndGtfs(String string, Gtfs gtfs);

}
