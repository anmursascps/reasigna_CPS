package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Routes;
import com.project.reasigna.models.Trips;

public interface TripsRepository extends JpaRepository<Trips, Long> {

    Trips findBytripId(String trip_id);

    List<Trips> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

    Trips findBytripIdAndGtfs(String string, Gtfs gtfs);

    List<Trips> findByRoutes(Routes routes);

    // Based on a route_id and a gtfs, generate a geojson with the trip geometry and the stops of the trip the geometry is in the table shapes 
    @Query(value = "SELECT jsonb_build_object('type','FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)\\:\\:json))\\:\\:text FROM (SELECT * FROM shapes WHERE id IN (SELECT shape_id FROM trips WHERE route_id=?1 AND gtfs_id=?2)) as t", nativeQuery = true)
    String findByRouteIdAndGtfs(Long route_id, Long gtfs_id);

    @Query(value = "SELECT id FROM trips WHERE gtfs_id = ?1", nativeQuery = true)
    List<Long> findIdsByGtfs(Long gtfs);

}
