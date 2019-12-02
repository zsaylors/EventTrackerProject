package com.skilldistillery.event.services;

import java.util.List;

import com.skilldistillery.event.entities.Event;

public interface EventService {

	public List<Event> findAll();

	public Event findById(int id);

	public Event addFilm(Event event);

	Event update(int id, Event event);

	boolean delete(int id);
}
