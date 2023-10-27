package com.project.reasigna.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Date;
import java.sql.Time;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stop_times", indexes = { 
    @Index(name = "stop_times_id_index", columnList = "stop_id"),
    @Index(name = "gtfs_id_stop_times_index", columnList = "gtfs_id"),
    @Index(name = "trip_id_stop_times_index", columnList = "trip_id"),
    @Index(name = "stops_id_stop_times_index", columnList = "stop_id"),
    @Index(name = "gtfs_id_stop_times_index", columnList = "gtfs_id")
})
public class StopTimes {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "trip_id", nullable = true)
    @JsonIgnore
    private Trips trips;

    @Column(name = "arrival_time", nullable = false)
    private Time arrival_time;

    @Column(name = "departure_time", nullable = false)
    private Time departure_time;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "stop_id", nullable = true)
    @JsonIgnore
    private Stops stops;

    @Column(name = "stop_sequence", nullable = false)
    private int stop_sequence;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;

}
