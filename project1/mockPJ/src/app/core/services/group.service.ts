import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Group } from '../models/group';
import { CONFIG } from 'src/app/shared/config';
import { JoinedGroups } from '../models/joined-groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(CONFIG.groupsUrl);
  }

  getGroup() {
    return this.http.get(CONFIG.groupUrl);
  }

  getGroupsById(courseID) {
    return this.http.get(CONFIG.groupsUrl + courseID);
  }

  addGroup(group: Group, courseID) {
    return this.http.post(CONFIG.createGroupUrl + courseID, group, {responseType: 'text'});
  }

  getJoinedGroups(): Observable<JoinedGroups[]> {
    return this.http.get<JoinedGroups[]>(CONFIG.apiURl);
  }
}
