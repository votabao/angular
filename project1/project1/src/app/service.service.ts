import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://5e4f459343b2b200142a346b.mockapi.io/event-calendar';

  constructor(
    private http: HttpClient
  ) {
  }

  getEvent() {
    return this.http.get(this.url);
  }

  getEventById(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  addEvent(event: any) {
    return this.http.post(this.url, event);
  }

  removeEvent(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  editEvent(event: any, id) {
    return this.http.put(`${this.url}/${id}`, event);
  }
}
