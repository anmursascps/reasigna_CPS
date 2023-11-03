package com.project.reasigna.models;
import com.fasterxml.jackson.annotation.JsonIgnore;

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

import java.sql.Time;
import java.util.List;

import org.mapdb.Atomic.Integer;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "frequencies", indexes = { @Index(name = "frequencies_trip_id_index", columnList = "trip_id") })
public class Frequencies {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trip_id", nullable = false)
    private String tripId;

    @Column(name = "start_time", nullable = false)
    private Time startTime;

    @Column(name = "end_time", nullable = false)
    private Time endTime;

    @Column(name = "headway_secs", nullable = false)
    private int headwaySecs;

    @Column(name = "exact_times", nullable = true)
    private String exactTimes;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "trip_id_fk", nullable = true)
    @JsonIgnore
    private Trips trips;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;

    
}