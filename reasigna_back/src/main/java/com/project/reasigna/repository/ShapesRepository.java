package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Shapes;

public interface ShapesRepository extends JpaRepository<Shapes, Long> {

    List<Shapes> findByshapeId(String string);

    List<Shapes> findByGtfs(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);

    Shapes findByshapeIdAndGtfs(String shape_id, Gtfs g);

    @Query(value = "SELECT jsonb_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)\\:\\:json))\\:\\:text FROM (SELECT * FROM shapes WHERE shape_id=?1 AND gtfs_id=?2) as t", nativeQuery = true)
    String retrieveGeoJsonByIdString(String shape_id, Long gtfs_id);

    // generate geojson from shapes table by gtfs_id
    @Query(value = "SELECT jsonb_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)\\:\\:json))\\:\\:text FROM (SELECT * FROM shapes WHERE gtfs_id=?1) as t", nativeQuery = true)
    String retrieveGeoJsonByGtfsId(Long gtfs_id);

}
