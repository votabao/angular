import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CONFIG } from 'src/app/shared/config';
import { CommonService } from './common.service';
import { EventCalendar } from '../models/event-calendar';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: EventCalendar[];

  constructor(
    private http: HttpClient,
    private service: CommonService) {
  }

  updateEvent(event: EventCalendar, id, groupId) {
    const params = { groupID: groupId, eventID: id };
    return this.http.put(CONFIG.putEvent, event, { responseType: 'text', params });
  }

  getEventById(id: number) {
    return this.http.get(CONFIG.eventDetail + id);
  }

  deleteEvent(groupId, id): Observable<any> {
    const params = { groupID: groupId, eventID: id };
    return this.http.delete(CONFIG.deleteEvent, { responseType: 'text', params });
  }

  getEvents(groupId): Observable<any[]> {
    const params = { groupID: groupId };
    return this.http.get<any[]>(CONFIG.eventsURL, { params });
  }

  addEvent(event: EventCalendar, groupId): Observable<any> {
    const params = { groupID: groupId };
    return this.http.post(CONFIG.addEvent, event, { params });
  }

  addEventForContent(event: EventCalendar, groupId, contentId): Observable<any> {
    const params = { groupID: groupId, contentID: contentId }
    return this.http.post(CONFIG.addEventContent, event, { params });
  }
}