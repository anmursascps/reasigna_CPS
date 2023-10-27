package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Stops;

public interface StopsRepository extends JpaRepository<Stops, Long> {

    Stops findBystopId(String stop_id);

    List<Stops> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

    Stops findBystopIdAndGtfs(String string, Gtfs g);


}
