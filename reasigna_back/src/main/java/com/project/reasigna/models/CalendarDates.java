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
@Table(name = "calendar_dates", indexes = { @Index(name = "calendar_dates_service_id_index", columnList = "service_id"),
@Index(name = "gtfs_id_calendar_dates_index", columnList = "gtfs_id") })
public class CalendarDates {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_id", nullable = false)
    private String service_id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "exception_type", nullable = false)
    private int exception_type;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gtfs_id", nullable = true)
    @JsonIgnore
    private Gtfs gtfs;
}
