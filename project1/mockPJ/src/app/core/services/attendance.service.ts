import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Attendance } from '../models/attendance';
import { CONFIG } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  attendance: Attendance[];

  constructor(private http: HttpClient) { }

  getAttendance(groupId, id): Observable<Attendance[]> {
    const params = { groupID: groupId, contentID: id };
    return this.http.get<Attendance[]>(CONFIG.memberAttenContentUrl, { params });
  }

  getHistoryAttendance(groupId, id): Observable<Attendance[]> {
    const params = { groupID: groupId, contentID: id };
    return this.http.get<Attendance[]>(CONFIG.getHistoryMemberUrl, { params });
  }

  addAttendance(attendance: Attendance[], groupId, id) {
    const params = { groupID: groupId, contentID: id };
    return this.http.post(CONFIG.updateAttenContentUrl, attendance, { params, responseType: 'text' });
  }

  getEventAttendance(groupId, id): Observable<Attendance[]> {
    const params = { groupID: groupId, eventID: id };
    return this.http.get<Attendance[]>(CONFIG.getEventAttendance, { params });
  }

  addEventAttendance(attendance: Attendance[], id, groupId) {
    const params = { groupID: groupId, eventID: id };
    return this.http.post(CONFIG.updateEventAttendanceUrl, attendance, { params, responseType: 'text' });
  }

  getEventsAtendance(groupId) {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.getEventsAtendance, { params });
  }

  getAtendanceEventMemberUrl(groupId, eventId) {
    const params = { groupID: groupId, eventID: eventId };
    return this.http.get(CONFIG.getAtendanceEventMemberUrl, { params });
  }
}
