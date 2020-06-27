import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CONFIG } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class AvatarCoverService {
  constructor(private http: HttpClient) { }

  getAvatar(groupId): Observable<any> {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.avatar, { params, responseType: 'text' });
  }

  uploadAvatar(avatar: any, groupId): Observable<any> {
    const params = { groupID: groupId };
    return this.http.put(CONFIG.editAvatar, avatar, { params, responseType: 'text' });
  }

  getCoverImg(groupId): Observable<any> {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.coverImg, { params })
  }

  uploadCover(coverImg: any, groupId): Observable<any> {
    const params = { groupID: groupId };
    return this.http.post(CONFIG.editCoverImg, coverImg, { params });
  }
}
