package com.skilldistillery.event.entities;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CategoryTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Event event;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("LaunchesPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		event = em.find(Event.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}

	@Test
	void test1() {
		assertEquals("SpaceX CRS-19", event.getName());
	}
	
	@Test
	void test2() {
		assertEquals(LocalDate.of(2019, 12, 04), event.getDate());
	}
	
	@Test
	void test3() {
		assertEquals("Cape Canaveral", event.getLocation());
	}
	
	@Test
	void test4() {
		assertEquals("An uncrewed SpaceX Dragon cargo spacecraft will lift off on a Falcon 9 rocket from Launch Complex 40 at Cape Canaveral Air Force Station in Florida, delivering supplies and equipment to the International Space Station.", event.getDescription());
	}
	
}
