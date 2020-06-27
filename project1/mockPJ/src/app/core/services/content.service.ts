import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Content } from '../models/content';
import { CONFIG } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getContents(): Observable<Content[]> {
    return this.http.get<Content[]>(CONFIG.contentsUrl);
  }

  addContent(content: Content): Observable<Content[]> {
    return this.http.post<Content[]>(CONFIG.contentUrl, content);
  }
}
