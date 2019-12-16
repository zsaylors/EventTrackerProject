import { Events } from './../../models/events';
import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  // F I E L D S
  events: Events[] = [];
  newEvent: Events = new Events();
  addEventBtn: boolean;
  selectedEvent: Events = null;
  editEvent: Events = null;


  // C O N S T R U C T O R
  constructor(private eventService: EventsService) { }


  // M E T H O D S
  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.index().subscribe(
      (pass) => {
        this.events = pass;
      },
      (fail) => {
        console.error(fail);
      }
    );
  }

  goHome() {
    this.loadEvents();
  }

  displaySingleEvent(event: Events) {
    this.selectedEvent = event;
    this.addEventBtn = false;
  }

  createEvent(event: Event) {
    this.eventService.create(event).subscribe(
      (pass) => {
        this.loadEvents();
        this.newEvent = new Events();
        this.addEventBtn = false;
      },
      (fail) => {
        console.error(fail);
      }
    );
  }

  setEditEvent() {
    this.editEvent = Object.assign({}, this.selectedEvent);
  }

  updateEvent(event: Events) {
    this.eventService.update(event).subscribe(
      (pass) => {
        this.editEvent = null;
        this.selectedEvent = event;
        this.loadEvents();
      },
      (fail) => {
        console.error(fail);
      }
    );
  }

  deleteEvent(id: number) {
    this.eventService.delete(id).subscribe(
      (pass) => {
        this.loadEvents();
        this.selectedEvent = null;
      },
      (fail) => {
        console.log(id);
        console.error(fail);
      }
    );
  }

  daysToNextLaunch() {
    let nextEventTime = 0;
    let nextEvent = null;
    let time = null;
    let today = null;
    const currentDate = new Date();
    this.events.forEach(element => {
      const eventDate = new Date(element.date);
      time = Math.floor((((currentDate.valueOf() - eventDate.valueOf()) * -1) + 1) / (1000 * 60 * 60 * 24)) + 1;
      if (time === 0) {
        today = 'today';
      }
      if (nextEventTime === 0 && time > 0) {
        nextEventTime = time;
        nextEvent = element;
      }
      if (nextEventTime >= time && time > 0) {
        nextEventTime = time;
        nextEvent = element;
      }
    });
    if (today) {
      return -1;
    } else {
      return nextEventTime;
    }
  }

  timeToLaunch(event: Events) {
    let time = null;
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    time = Math.floor((((currentDate.valueOf() - eventDate.valueOf()) * -1) + 1) / (1000 * 60 * 60 * 24)) + 1;

    if (time === -1) {
      return 'This launch was yesterday.';
    } else if (time < 0) {
      return 'This launch was ' + (time * -1) + ' days ago.';
    } else if (time === 0) {
      return 'This launch is today!';
    } else if (time === 1) {
      return 'This launch is tomorrow!';
    } else {
      return 'This launch is in ' + time + ' days.';
    }
  }
}
