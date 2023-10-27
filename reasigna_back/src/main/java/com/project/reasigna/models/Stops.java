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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stops", indexes = { @Index(name = "stop_id_index", columnList = "stop_id"),
@Index(name = "gtfs_id_stops_index", columnList = "gtfs_id") })
public class Stops {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stop_id", nullable = false)
    private String stopId;

    @Column(name = "stop_name", nullable = false)
    private String stop_name;

    @Column(name = "stop_lat", nullable = false)
    private double stop_lat;

    @Column(name = "stop_lon", nullable = false)
    private double stop_lon;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;

}
