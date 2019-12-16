import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Events } from '../models/events';
import { throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  // F I E L D S
  baseUrl = 'http://localhost:8093/';
  url = this.baseUrl + 'api/events';


  // C O N S T R U C T O R
  constructor(private http: HttpClient) { }


  // M E T H O D S
  index() {
    return this.http.get<Events[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('EventsService.index(): Error creating index list');
      })
    );
  }

  create(newEvent: Event) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<Events>(this.url + '?sorted=true', newEvent, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('EventsService.create(): Error creating index new event');
      })
    );
  }

  update(event: Events) {
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
      }
    };
    return this.http.put(`${this.url}/${event.id}`, event, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('EventsService.update(): Error updating event');
      })
    );
  }

  delete(id: number) {
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
      }
    };
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('EventsService.delete(): Error deleting event');
      })
    );
  }

}
