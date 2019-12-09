package com.skilldistillery.event.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Event {

	// F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	private String location;
	private String description;
	private LocalDate date;
	
	
	// C O N S T R U C T O R S
	
	public Event() {}
	
	public Event(int id, String name, String location, String description, LocalDate date) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.description = description;
		this.date = date;
	}

	// G E T T E R S   A N D   S E T T E R S
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	// T O   S T R I N G
	@Override
	public String toString() {
		return "Event [id=" + id + ", name=" + name + ", location=" + location + ", description=" + description
				+ ", date=" + date + "]";
	}	
}
