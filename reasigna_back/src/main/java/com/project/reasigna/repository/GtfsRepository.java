package com.project.reasigna.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.reasigna.models.Gtfs;

import java.util.List;

public interface GtfsRepository extends JpaRepository<Gtfs, Long> {

    List<Gtfs> findByProjectId(Long projectId);

    // Delete stopTimes where gtfs_id = ?1
    @Query(value = "DELETE FROM stop_times WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteStopTimes(Long gtfs_id);

    // Delete stops where gtfs_id = ?1
    @Query(value = "DELETE FROM stops WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteStops(Long gtfs_id);

    // Delete trips where gtfs_id = ?1
    @Query(value = "DELETE FROM trips WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteTrips(Long gtfs_id);

    // Delete shapes where gtfs_id = ?1
    @Query(value = "DELETE FROM shapes WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteShapes(Long gtfs_id);

    // Delete calendarDates
    @Query(value = "DELETE FROM calendar_dates WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteCalendarDates(Long gtfs_id);

    // Delete calendars
    @Query(value = "DELETE FROM calendar WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteCalendar(Long gtfs_id);

    // Delete routes
    @Query(value = "DELETE FROM routes WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteRoutes(Long gtfs_id);

    // Delete all tables and objects related to gtfs
    @Query(value = "DELETE FROM agency WHERE gtfs_id = ?1", nativeQuery = true)
    void deleteAgency(Long gtfs_id);

    @Query(value = "DELETE FROM stop_times WHERE gtfs_id = ?1 ; " +
            "DELETE FROM stops WHERE gtfs_id = ?1 ;" +
            "DELETE FROM trips WHERE gtfs_id = ?1 ;" +
            "DELETE FROM shapes WHERE gtfs_id = ?1 ;" +
            "DELETE FROM calendar_dates WHERE gtfs_id = ?1 ;" +
            "DELETE FROM calendar WHERE gtfs_id = ?1 ;" +
            "DELETE FROM routes WHERE gtfs_id = ?1 ;" +
            "DELETE FROM agency WHERE gtfs_id = ?1 ;" +
            "DELETE FROM gtfs WHERE id = ?1", nativeQuery = true)
    void deleteGtfsAndRelatedTables(Long gtfs_id);

}
