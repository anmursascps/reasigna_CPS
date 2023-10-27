package com.project.reasigna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.reasigna.models.Agency;
import com.project.reasigna.models.Gtfs;

public interface AgencyRepository extends JpaRepository<Agency, Long> {

    // Find by agency_id
    @Query("SELECT a FROM Agency a WHERE a.agency_id = ?1")
    Agency findByagencyId(String agency_id);

    // Find last entry
    Agency findTopByOrderByIdDesc();

    @Query(value = "SELECT * FROM agency WHERE agency_id = ?1 AND gtfs_id = ?2", nativeQuery = true)
    Agency findByAgencyIdAndGtfs(String agency_id, Long gtfs_id);

    List<Agency> findByGtfs(Gtfs g);

    @Query("SELECT a FROM Agency a WHERE a.gtfs = ?1")
    Agency findByGtfsId(Gtfs gtfs);

    void deleteByGtfs(Gtfs gtfs);
}
