package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.StopTimes;
import com.project.reasigna.models.Trips;

public interface StopTimesRepository extends JpaRepository<StopTimes, Long> {

    List<StopTimes> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

    List<StopTimes> findByTrips(Trips trips);


}
