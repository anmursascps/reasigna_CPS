package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.reasigna.models.Frequencies;
import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Trips;

public interface FrequenciesRepository extends JpaRepository<Frequencies, Long> {

    List<Frequencies> findByGtfs(Gtfs gtfs);

    List<Frequencies> findByTrips(Trips trip);

    @Query(value = "SELECT id FROM frequencies WHERE gtfs_id = ?1", nativeQuery = true)
    List<Long> findIdsByGtfs(Long gtfs);

}
