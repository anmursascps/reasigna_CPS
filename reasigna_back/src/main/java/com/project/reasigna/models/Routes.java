package com.project.reasigna.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "routes", indexes = { @Index(name = "route_id_index", columnList = "route_id"),
@Index(name = "gtfs_id_routes_index", columnList = "gtfs_id") })
public class Routes {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "route_id", nullable = false)
    private String routeId;

    @Column(name = "route_short_name", nullable = false)
    private String route_short_name;

    @Column(name = "route_type", nullable = false)
    private String route_type;

    // Many to one relationship with agency
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "agency", nullable = true)
    // @JsonIgnore
    private Agency agency;

    @Column(name = "agency_id", nullable = true)
    private String agency_id;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;

}
