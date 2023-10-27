package com.project.reasigna.models;

import org.springframework.util.RouteMatcher.Route;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "agency", indexes = {
        @Index(name = "agency_id_index", columnList = "agency_id"),
        @Index(name = "gtfs_id_agency_index", columnList = "gtfs_id")
})
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Agency {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "agency_id", nullable = false)
    private String agency_id;

    @Column(name = "agency_name", nullable = false)
    private String agency_name;

    @Column(name = "agency_url", nullable = false)
    private String agency_url;

    @Column(name = "agency_timezone", nullable = false)
    private String agency_timezone;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;

}
