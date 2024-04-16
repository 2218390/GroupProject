package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
        private Long id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonBackReference
    private User user;

    private int applicationLimit;
    private int numberOfApplications;

    private String location;
    private Date date;
    private String userName;
    private String email;
    private boolean isFull;
    private boolean isFinished;


    @OneToMany(mappedBy="event", cascade = CascadeType.ALL)

    private List<Application> applications=new ArrayList<>();

    public Event() {
        super();
        // TODO Auto-generated constructor stub
    }


    public Event(String name, String description, User user, int numberOfApplications, int applicationLimit, String location, Date date, String userName, String email, List<Application> applications, boolean isFull, boolean isFinished) {
        super();
        this.name = name;
        this.description=description;
        this.user=user;
        this.numberOfApplications=numberOfApplications;
        this.applicationLimit=applicationLimit;
        this.location=location;
        this.date=date;
        this.userName=userName;
        this.email=email;
        this.applications=applications;
        this.isFull=isFull;
        this.isFinished=isFinished;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id){
        this.id=id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription(){return description;}
    public void setDescription(String description){this.description=description;}
    public User getUser() {
        return user;
    }
    public void setUser(User user){
        this.user=user;
    }
    public int getNumberOfApplications(){
        return numberOfApplications;
    }
    public void setNumberOfApplications(int numberOfApplications){
        this.numberOfApplications=numberOfApplications;
    }

    public int getApplicationLimit(){
        return applicationLimit;
    }
    public void setApplicationLimit(int applicationLimit){
        this.applicationLimit=applicationLimit;
    }
    public String getLocation(){return location;}
    public void setLocation(String location){this.location=location;}
    public Date getDate(){return date;}
    public void setDate(Date date){this.date=date;}
    public String getUserName(){return userName;}
    public void setUserName(String userName){this.userName=userName;}

    public String getEmail(){return email;}
    public void setEmail(String email){this.email=email;}
    public List<Application> getApplications(){
        return applications;
    }
    public void setApplications(List<Application> applications){
        this.applications=applications;
    }
    public boolean getFull(){return isFull;}
    public void setFull(boolean isFull){this.isFull=isFull;}
    public boolean getIsFinished(){return isFinished;}
    public void setIsFinished(boolean isFinished){this.isFinished=isFinished;}
}

