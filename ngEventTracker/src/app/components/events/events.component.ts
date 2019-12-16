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

  // daysToNextLaunch(event: Events) {
  //   const time = new Date().getTime() - new Date(event.date).getTime();
  //   return time;
  // }
}
