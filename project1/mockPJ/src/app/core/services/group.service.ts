import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Group } from '../models/group';
import { CONFIG } from 'src/app/shared/config';
import { JoinedGroups } from '../models/joined-groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  refreshData = new Subject();

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(CONFIG.groupsUrl);
  }

  getGroup(groupId) {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.groupDetail, { params });
  }

  getGroupsById(courseId) {
    const params = { courseID: courseId };
    return this.http.get(CONFIG.groupsUrl, { params });
  }

  getGroupById(groupId) {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.groupDetail, { params });
  }

  editGroup(group: any, id) {
    const params = { groupID: id };
    return this.http.put(CONFIG.editGroup, group, { params })
  }

  addGroup(group: Group, courseId) {
    const params = { courseID: courseId };
    return this.http.post(CONFIG.createGroupUrl, group, { responseType: 'text', params });
  }

  getJoinedGroups(): Observable<JoinedGroups[]> {
    return this.http.get<JoinedGroups[]>(CONFIG.followingGroups);
  }

  leaveGroup(groupId) {
    const params = { groupID: groupId };
    return this.http.put(CONFIG.leaveGroup, null, { responseType: 'text', params });
  }
  joinGroup(groupId) {
    const params = { groupID: groupId };
    return this.http.put(CONFIG.joinGroup, null, { responseType: 'text', params });
  }

  getStatusUserInGroup(groupId) {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.getStatusUserInGroup, { responseType: 'text', params });
  }
}
