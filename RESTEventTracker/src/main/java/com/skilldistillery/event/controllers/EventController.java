package com.skilldistillery.event.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.event.entities.Event;
import com.skilldistillery.event.services.EventService;

@RestController
@RequestMapping("api")
public class EventController {
	
	@Autowired
	private EventService svc;

	@GetMapping("events")
	@ResponseBody
	public List<Event> allEvents() {
		return svc.findAll();
	}
	
	@GetMapping(path="event/{id}")
	@ResponseBody
	public Event getById(@PathVariable("id") Integer id, HttpServletResponse resp){
		Event event = svc.findById(id);
		if (event == null) {
			resp.setStatus(404);
		}
		return event;
	}
	
	@PostMapping("post")
	public Event create(@RequestBody Event event, HttpServletResponse resp, HttpServletRequest req)  {
		try {
			event = svc.addFilm(event);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(event.getId());
			resp.addHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
		return event;
	}
	
	
	@PutMapping("event/{id}")
	public Event update(@PathVariable("id") Integer id, @RequestBody Event event, HttpServletResponse resp)  {
		try {
			event = svc.update(id, event);
			if (event == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			event = null;
		}
		return event;
	}

	@DeleteMapping(path = "event/{id}")
	public void delete(@PathVariable("id") Integer id, HttpServletResponse resp) {
		boolean deleted = svc.delete(id);
		try {
			if (deleted) {
				resp.setStatus(204);
			} else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
	}	
}
