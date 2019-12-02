package com.skilldistillery.event.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.event.entities.Event;
import com.skilldistillery.event.repositories.EventRepository;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	private EventRepository repo;
	
	@Override
	public List<Event> findAll() {
		return repo.findAll();
	}
	
	@Override 
	public Event findById(int id) {
		return repo.findById(id);
	}
	
	@Override
	public Event addFilm(Event event) {
		repo.saveAndFlush(event);
		return event;
	}
	
	@Override
	public Event update(int id, Event event) {
		Event update = repo.findById(id);
//		if (update != null) {
			update.setName(event.getName());
			update.setDescription(event.getDescription());
			update.setLocation(event.getLocation());
			update.setDate(event.getDate());
			return repo.saveAndFlush(update);
//		} 
//		return update;
	}
	
	@Override
	public boolean delete(int id) {
		boolean deleted = false;
		if (repo.existsById(id)) {
			repo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

}
