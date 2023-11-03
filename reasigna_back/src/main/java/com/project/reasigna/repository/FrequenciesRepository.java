package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.reasigna.models.Frequencies;
import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Trips;

public interface FrequenciesRepository extends JpaRepository<Frequencies, Long> {

    List<Frequencies> findByGtfs(Gtfs gtfs);

    List<Frequencies> findByTrips(Trips trip);

}
