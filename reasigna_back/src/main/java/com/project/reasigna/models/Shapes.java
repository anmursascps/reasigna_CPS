package com.project.reasigna.models;

import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Point;
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
@Table(name = "shapes", indexes = { @Index(name = "shape_id_index", columnList = "shape_id"),
        @Index(name = "gtfs_id_shapes_index", columnList = "gtfs_id") })
public class Shapes {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shape_id", nullable = false)
    private String shapeId;

    @Column(name = "shape_pt_lat", nullable = false)
    private double shape_pt_lat;

    @Column(name = "shape_pt_lon", nullable = false)
    private double shape_pt_lon;

    @Column(name = "shape_pt_sequence", nullable = false)
    private int shape_pt_sequence;

    @Column(name = "linestring")
    // @JsonIgnore
    private LineString linestring;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = false)
    @JsonIgnore
    private Gtfs gtfs;

    public String getLinestring() {
        if (linestring == null) {
            return null;
        } else {
            return linestring.toString();
        }
    }

}
