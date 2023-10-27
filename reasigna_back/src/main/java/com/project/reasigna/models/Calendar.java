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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "calendar", indexes = { @Index(name = "service_id_index", columnList = "service_id"),
        @Index(name = "gtfs_id_calendar_index", columnList = "gtfs_id")
})
public class Calendar {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_id", nullable = false)
    private String serviceId;

    @Column(name = "monday", nullable = false)
    private boolean monday;

    @Column(name = "tuesday", nullable = false)
    private boolean tuesday;

    @Column(name = "wednesday", nullable = false)
    private boolean wednesday;

    @Column(name = "thursday", nullable = false)
    private boolean thursday;

    @Column(name = "friday", nullable = false)
    private boolean friday;

    @Column(name = "saturday", nullable = false)
    private boolean saturday;

    @Column(name = "sunday", nullable = false)
    private boolean sunday;

    @Column(name = "start_date", nullable = false)
    private Date start_date;

    @Column(name = "end_date", nullable = false)
    private Date end_date;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;

}
