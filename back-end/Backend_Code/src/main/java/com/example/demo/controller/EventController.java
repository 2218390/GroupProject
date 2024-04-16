package com.example.demo.controller;

import com.example.demo.model.Application;
import com.example.demo.model.Event;
import com.example.demo.model.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EventService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    EventService eventService;

    @PostMapping(path="/create/{userId}")
    public ResponseEntity<?> createEvent(@PathVariable Long userId, @RequestBody Event event) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            event.setUser(user);
            Event savedEvent = eventRepository.save(event);
            return ResponseEntity.ok(savedEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findByIsFinishedFalse();
        return ResponseEntity.ok(events);
    }
    @GetMapping("/{userId}/events")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable Long userId) {
        List<Event> events = eventService.getEvents(userId).stream()
                .filter(event -> !event.getIsFinished()) // Filter events not marked as finished
                .collect(Collectors.toList());
        return ResponseEntity.ok(events);
    }
    @GetMapping("/{userId}/events/all")
    public ResponseEntity<List<Event>> getEventsByUserIdFinished(@PathVariable Long userId) {
        List<Event> events = eventService.getEvents(userId);
        return ResponseEntity.ok(events);
    }
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable(value = "id") long Id) {
        eventService.deleteEvent(Id);
        return "User Deleted";
    }
    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEventsByName(@RequestParam String name) {
        List<Event> events = eventRepository.findByNameContainingIgnoreCase(name);
        return ResponseEntity.ok(events);
    }
    @GetMapping("/city")
    public ResponseEntity<List<Event>> getEventsByLocation(@RequestParam String location) {
        List<Event> events = eventRepository.findByLocation(location);
        return ResponseEntity.ok(events);
    }
    @PutMapping("/{eventId}/markFinished")
    public ResponseEntity<?> markEventAsFinished(@PathVariable Long eventId) {
        eventService.markEventAsFinished(eventId);
        return ResponseEntity.ok("Event marked as finished");
    }
    @PutMapping("/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody Event updatedEvent) {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();

            // Check if the updated application limit is greater than or equal to the current number of applications
            if (updatedEvent.getApplicationLimit() >= event.getNumberOfApplications()) {
                event.setName(updatedEvent.getName());
                event.setLocation(updatedEvent.getLocation());
                event.setApplicationLimit(updatedEvent.getApplicationLimit());
                event.setDate(updatedEvent.getDate());
                event.setDescription(updatedEvent.getDescription());
                // Update other properties as needed

                Event savedEvent = eventRepository.save(event);
                return ResponseEntity.ok(savedEvent);
            } else {
                return ResponseEntity.badRequest().body("Application limit can't be lower than the current number of applications.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId) {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
