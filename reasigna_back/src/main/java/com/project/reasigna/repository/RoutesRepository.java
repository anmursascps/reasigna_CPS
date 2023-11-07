package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Routes;

public interface RoutesRepository extends JpaRepository<Routes, Long> {

    Routes findByrouteId(String route_id);

    List<Routes> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

    Routes findByrouteIdAndGtfs(String string, Gtfs gtfs);

    @Query(value = "SELECT id FROM routes WHERE gtfs_id = ?1", nativeQuery = true)
    List<Long> findIdsByGtfs(Long gtfs);

}
