package com.project.reasigna.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.reasigna.models.Agency;
import com.project.reasigna.models.Calendar;
import com.project.reasigna.models.CalendarDates;
import com.project.reasigna.models.Frequencies;
import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Project;
import com.project.reasigna.models.Routes;
import com.project.reasigna.models.Shapes;
import com.project.reasigna.models.StopTimes;
import com.project.reasigna.models.Stops;
import com.project.reasigna.models.Trips;
import com.project.reasigna.repository.AgencyRepository;
import com.project.reasigna.repository.CalendarDatesRepository;
import com.project.reasigna.repository.CalendarRepository;
import com.project.reasigna.repository.FrequenciesRepository;
import com.project.reasigna.repository.GtfsRepository;
import com.project.reasigna.repository.ProjectRepository;
import com.project.reasigna.repository.RoutesRepository;
import com.project.reasigna.repository.ShapesRepository;
import com.project.reasigna.repository.StopTimesRepository;
import com.project.reasigna.repository.StopsRepository;
import com.project.reasigna.repository.TripsRepository;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private GtfsRepository gtfsRepository;

    @Autowired
    private AgencyRepository agencyRepository;

    @Autowired
    private RoutesRepository routesRepository;

    @Autowired
    private StopsRepository stopsRepository;

    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private ShapesRepository shapesRepository;

    @Autowired
    private CalendarDatesRepository calendarDatesRepository;

    @Autowired
    private TripsRepository tripsRepository;

    @Autowired
    private StopTimesRepository stopTimesRepository;

    @Autowired
    private FrequenciesRepository frequenciesRepository;

    @GetMapping("/all")
    public java.util.List<Project> getAll() {
        return projectRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody Project projectName) {
        System.out.println(projectName);
        projectRepository.save(projectName);
        return ResponseEntity.ok("Project created successfully!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable("id") Long projectId) {
        System.out.println(projectId);

        List<Gtfs> gtfss = gtfsRepository.findByProjectId(projectId);

        for (Gtfs gtfs_ : gtfss) {
            Long gtfs = gtfs_.getId();
            long startTime = System.currentTimeMillis(); // get start time

            // Get all related entities in one query for each type
            List<Long> stopIds = stopsRepository.findIdsByGtfs(gtfs);
            List<Long> stopTimeIds = stopTimesRepository.findIdsByGtfs(gtfs);
            List<Long> tripIds = tripsRepository.findIdsByGtfs(gtfs);
            List<Long> shapeIds = shapesRepository.findIdsByGtfs(gtfs);
            List<Long> calendarDateIds = calendarDatesRepository.findIdsByGtfs(gtfs);
            List<Long> calendarIds = calendarRepository.findIdsByGtfs(gtfs);
            List<Long> routeIds = routesRepository.findIdsByGtfs(gtfs);
            List<Long> agencyIds = agencyRepository.findIdsByGtfs(gtfs);
            List<Long> frequencyIds = frequenciesRepository.findIdsByGtfs(gtfs);

            int batchSize = 2500;

            // Delete related entities using bulk deletion
            deleteEntitiesInBatches("stop_times", stopTimeIds, batchSize);
            deleteEntitiesInBatches("stops", stopIds, batchSize);
            deleteEntitiesInBatches("shapes", shapeIds, batchSize);
            deleteEntitiesInBatches("calendar_dates", calendarDateIds, batchSize);
            deleteEntitiesInBatches("calendar", calendarIds, batchSize);
            deleteEntitiesInBatches("routes", routeIds, batchSize);
            deleteEntitiesInBatches("agency", agencyIds, batchSize);
            deleteEntitiesInBatches("frequencies", frequencyIds, batchSize);
            deleteEntitiesInBatches("trips", tripIds, batchSize);

            // Delete the Gtfs entity
            gtfsRepository.delete(gtfs_);

            long endTime = System.currentTimeMillis(); // get end time
            long duration = endTime - startTime; // calculate duration
            System.out.println("Deleting GTFS (" + gtfs + ") took " + duration + " milliseconds to execute");
            System.out.println("######################################################");
        }

        // Delete the project
        projectRepository.deleteById(projectId);

        return ResponseEntity.ok("Project deleted successfully!");
    }

    private void deleteEntitiesInBatches(String tableName, List<Long> entityIds, int batchSize) {
        System.out.println("Deleting " + entityIds.size() + " " + tableName + " entities in batches of " + batchSize);
        for (int i = 0; i < entityIds.size(); i += batchSize) {
            List<Long> batch = entityIds.subList(i, Math.min(i + batchSize, entityIds.size()));
            String sql = "DELETE FROM " + tableName + " WHERE id IN ("
                    + String.join(",", batch.stream().map(Object::toString).toArray(String[]::new)) + ")";
            jdbcTemplate.update(sql);
        }
        System.out.println("Finished deleting " + entityIds.size() + " " + tableName + " entities in batches of " + batchSize);
        System.out.println("================================================================");
    }

}
