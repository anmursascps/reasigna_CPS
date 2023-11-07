package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Stops;

public interface StopsRepository extends JpaRepository<Stops, Long> {

    Stops findBystopId(String stop_id);

    List<Stops> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

    Stops findBystopIdAndGtfs(String string, Gtfs g);

    @Query(value = "SELECT id FROM stops WHERE gtfs_id = ?1", nativeQuery = true)
    List<Long> findIdsByGtfs(Long gtfs);

}
