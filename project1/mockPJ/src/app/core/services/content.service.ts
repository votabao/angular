import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Content } from '../models/content';
import { CONFIG } from 'src/app/shared/config';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  refresh = new Subject();
  content: Content[];
  constructor(private http: HttpClient, private service: CommonService) { }

  getContents(groupId): Observable<Content[]> {
    const params = { groupID: groupId };
    return this.http.get<Content[]>(CONFIG.contentsUrl, { params });
  }

  getListAttendContent(groupId): Observable<Content[]> {
    const params = { groupID: groupId };
    return this.http.get<Content[]>(CONFIG.listAttenContentUrl, { params });
  }

  addContent(content: Content, groupId): Observable<Content[]> {
    const params = { groupID: groupId };
    return this.http.post<Content[]>(CONFIG.addContentUrl, content, { params });
  }

  getContentById(contentId) {
    const params = { contentID: contentId };
    return this.http.get(CONFIG.contentUrlID, { params });
  }

  updateContent(content: Content, groupId, contentId): Observable<any> {
    const params = { groupID: groupId, contentID: contentId };
    return this.http.put(CONFIG.editContentUrl, content, { params });
  }

  removeContent(groupId, contentId) {
    const params = { groupID: groupId, contentID: contentId };
    return this.http.delete(CONFIG.deleteContentUrl, { params }).subscribe(() => {
      this.service.showSuccessNotify('Remove Content Success', 'Success');
      this.refresh.next();
    }, err => {
      this.service.showErrorNotify(`Error: ${err.message}`, 'Fail!');
    }
    );
  }

  convertDateToObject(date) {
    date = new Date(date);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }
  convertDateToString(date) {
    return date.year + date.month + date.day
  }
}
