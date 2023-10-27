package com.project.reasigna.controllers;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.reasigna.models.Agency;
import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.Routes;
import com.project.reasigna.models.StopTimes;
import com.project.reasigna.models.Stops;
import com.project.reasigna.models.Trips;
import com.project.reasigna.repository.AgencyRepository;
import com.project.reasigna.repository.GtfsRepository;
import com.project.reasigna.repository.RoutesRepository;
import com.project.reasigna.repository.StopTimesRepository;
import com.project.reasigna.repository.StopsRepository;
import com.project.reasigna.repository.TripsRepository;
import com.project.reasigna.utils.Utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/routes")
@CrossOrigin(origins = "http://localhost:3000")
public class RoutesController {

    @Autowired
    private RoutesRepository routesRepository;

    @Autowired
    private AgencyRepository agencyRepository;

    @Autowired
    private TripsRepository tripsRepository;

    @Autowired
    private StopTimesRepository stopTimesRepository;

    @Autowired
    private StopsRepository stopsRepository;

    @Autowired
    private GtfsRepository gtfsRepository;

    @PostMapping("/upload")
    public String uploadRoutes(@RequestParam("file") MultipartFile file) throws IOException {
        String message = "";
        String[] required_columns = { "route_id", "route_short_name", "route_type" };

        boolean valid = Objects.equals(file.getContentType(), "text/plain");
        // The file must be a text file, csv like
        if (valid) {
            System.out.println("File is valid");
            // Read the file
            byte[] bytes = file.getBytes();
            String content = new String(bytes);

            // Split the file by lines
            String[] lines = content.split("\n");
            // Get the headers and trim them
            String[] headers = lines[0].split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
            for (int i = 0; i < headers.length; i++) {
                headers[i] = headers[i].trim();
            }

            Map<String, Integer> headerIndices = new HashMap<>();
            for (int i = 0; i < headers.length; i++) {
                headerIndices.put(headers[i], i);
            }

            // Check if headers have the required columns
            if (Utils.isValid(headers, required_columns)) {
                for (int i = 1; i < lines.length; i++) {
                    System.out.println(lines[i]);
                    String[] values = lines[i].split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                    String route_id = values[headerIndices.get("route_id")];
                    String route_short_name = values[headerIndices.get("route_short_name")];
                    String route_type = values[headerIndices.get("route_type")];
                    Routes route = new Routes();
                    Agency a = agencyRepository.findByagencyId(values[headerIndices.get("agency_id")]);
                    route.setAgency(a);
                    route.setRouteId(route_type);
                    route.setRoute_short_name(route_short_name);
                    route.setRoute_type(route_type);
                    routesRepository.save(route);
                }
            } else {
                System.out.println("Headers are not valid");
            }

        } else {
            message = "Please upload a valid file!";
        }
        System.out.println(message);
        return message;
    }

    @GetMapping("{id}")
    public ResponseEntity<Object> getRoutesById(@PathVariable Long id) {
        System.out.println(id);
        Map<String, Object> response = new HashMap<>();

        // Get the route by id
        Routes route = routesRepository.findById(id).get();

        List<Trips> trips = tripsRepository.findByRoutes(route);

        Gtfs g = gtfsRepository.findById(route.getGtfs().getId()).get();

        List<Map<String, Object>> tripsWithStops = new ArrayList<>();

        for (Trips trip : trips) {
            Map<String, Object> tripWithStops = new HashMap<>();
            tripWithStops.put("trip", trip);

            List<StopTimes> stopTimes = stopTimesRepository.findByTrips(trip);
            List<Map<String, Object>> stopTimesWithStops = new ArrayList<>();
            for (StopTimes stopTime : stopTimes) {
                Map<String, Object> stopTimeWithStop = new HashMap<>();
                stopTimeWithStop.put("stopTime", stopTime);

                Stops stop = stopsRepository.findBystopIdAndGtfs(stopTime.getStops().getStopId(), g);
                stopTimeWithStop.put("stop", stop);

                stopTimesWithStops.add(stopTimeWithStop);
            }
            tripWithStops.put("stopTimes", stopTimesWithStops);

            tripsWithStops.add(tripWithStops);
        }
        String geojsonString = tripsRepository.findByRouteIdAndGtfs(route.getId(), route.getGtfs().getId());
        response.put("geojson", geojsonString);

        response.put("tripsWithStops", tripsWithStops);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
