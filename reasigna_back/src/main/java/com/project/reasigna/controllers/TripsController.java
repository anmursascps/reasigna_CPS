package com.project.reasigna.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.reasigna.models.Gtfs;
import com.project.reasigna.models.StopTimes;
import com.project.reasigna.models.Stops;
import com.project.reasigna.models.Trips;
import com.project.reasigna.repository.GtfsRepository;
import com.project.reasigna.repository.ShapesRepository;
import com.project.reasigna.repository.StopTimesRepository;
import com.project.reasigna.repository.StopsRepository;
import com.project.reasigna.repository.TripsRepository;

@RestController
@RequestMapping("/trips")
@CrossOrigin(origins = "*")
public class TripsController {
    @Autowired
    private TripsRepository tripsRepository;

    @Autowired
    private ShapesRepository shapesRepository;

    @Autowired
    private GtfsRepository gtfsRepository;

    @Autowired
    private StopsRepository stopsRepository;

    @Autowired
    private StopTimesRepository stopTimesRepository;

    @GetMapping("{id}")
    public ResponseEntity<Object> getTripsById(@PathVariable Long id) {
        System.out.println(id);
        Map<String, Object> response = new HashMap<>();

        Trips trips = tripsRepository.findById(id).get();
        Gtfs g = gtfsRepository.findById(trips.getGtfs().getId()).get();
        List<StopTimes> stopTimes = stopTimesRepository.findByTrips(trips);
        List<Map<String, Object>> stops = new ArrayList<>(); // Initialize the stops list
        for (StopTimes stopTimes2 : stopTimes) {
            Stops stop = stopsRepository.findBystopIdAndGtfs(stopTimes2.getStops().getStopId(), g);
            Map<String, Object> stopInfo = new HashMap<>();
            stopInfo.put("id", stopTimes2.getId());
            stopInfo.put("arrival_time", stopTimes2.getArrival_time());
            stopInfo.put("departure_time", stopTimes2.getDeparture_time());
            stopInfo.put("stop_sequence", stopTimes2.getStop_sequence());
            stopInfo.put("stop_name", stop.getStop_name());
            stopInfo.put("stop_lon", stop.getStop_lon());
            stopInfo.put("stop_lat", stop.getStop_lat());
            stops.add(stopInfo);
        }
        response.put("stops", stops);

        response.put("trips", trips);

        String shape_id = trips.getShapes().getShapeId();

        String geojson = shapesRepository.retrieveGeoJsonByIdString(shape_id, g.getId());

        response.put("geojson", geojson);

        return ResponseEntity.ok(response);
    }

}
