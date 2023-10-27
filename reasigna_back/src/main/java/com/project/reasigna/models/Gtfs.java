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

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gtfs", indexes = { @Index(name = "gtfs_name_index", columnList = "gtfs_name") })
public class Gtfs {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gtfs_name", nullable = false)
    private String gtfsName;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "project_id", nullable = true)
    @JsonIgnore
    private Project project;

    public Gtfs(String gtfsName, Project project) {
        this.gtfsName = gtfsName;
        this.project = project;
    }
}
