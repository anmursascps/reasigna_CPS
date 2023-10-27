package com.project.reasigna.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.reasigna.models.Project;
import com.project.reasigna.repository.ProjectRepository;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/all")
    public java.util.List<Project> getAll() {
        return projectRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody Project projectName) {
        System.out.println(projectName);
        projectRepository.save(projectName);
        return ResponseEntity.ok("Project created successfully!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable("id") Long projectId) {
        System.out.println(projectId);
        projectRepository.delete(projectRepository.findById(projectId).get());
        return ResponseEntity.ok("Project deleted successfully!");
    }

}
