package com.example.demo.repository;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUserId(Long userId);
    List<Event> findByNameContainingIgnoreCase(String name);
    List<Event> findByLocation(String location);
    List<Event> findByIsFinishedFalse();

    @Query("SELECT e FROM Event e WHERE e.isFinished = false ORDER BY e.numberOfApplications DESC")
    List<Event> findTopTrendingEvents(Pageable pageable);
}