package com.skilldistillery.event.repositories;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.event.entities.Event;


@RunWith(SpringRunner.class)
@SpringBootTest
public class EventRepositoryTest {
	@Autowired
	private EventRepository repo;

	@Test
	void test() {
		Event addrOptl = repo.findById(1);
		assertNotNull(addrOptl);
		assertEquals(1, addrOptl.getId());
		}
}