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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "trips", indexes = { @Index(name = "gtfs_id_trips_index", columnList = "gtfs_id") })
public class Trips {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "route_id", nullable = true)
    @JsonIgnore
    private Routes routes;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "service_id", nullable = true)
    private Calendar calendar;

    @Column(name = "trip_id", nullable = false)
    private String tripId;

    @Column(name = "trip_headsign", nullable = true)
    private String tripHeadsign;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shape_id", nullable = true)
    @JsonIgnore
    private Shapes shapes;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;

}
