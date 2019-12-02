package com.skilldistillery.event.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.event.entities.Event;

public interface EventRepository extends JpaRepository <Event, Integer>{

	public Event findById(int id);
}
