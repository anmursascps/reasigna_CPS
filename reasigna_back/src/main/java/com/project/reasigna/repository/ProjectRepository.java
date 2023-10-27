package com.project.reasigna.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.reasigna.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}
