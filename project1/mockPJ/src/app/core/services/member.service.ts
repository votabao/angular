import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from './common.service';

import { Member } from '../models/member';
import { CONFIG } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  refreshData = new Subject();

  constructor(
    private http: HttpClient,
    private notify: CommonService
  ) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(CONFIG.membersUrl);
  }

  createMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(CONFIG.pendingUrl, member)
      .pipe(
        tap(() => {
          this.refreshData.next();
        })
      );
  }

  removeMember(memberID, message, title) {
    this.http
      .delete(`${CONFIG.membersUrl}/${memberID}`)
      .subscribe(
        () => {
          this.notify.showSuccessNotify(message, title);
          this.refreshData.next();
        });
  }

  getPendingUsers(): Observable<Member[]> {
    return this.http.get<Member[]>(CONFIG.pendingUrl);
  }

  decline(memberID, member, message, title) {
    this.http.delete(`${CONFIG.pendingUrl}/${memberID}`)
      .subscribe(() => {
        this.notify.showSuccessNotify(message, title);
        this.refreshData.next();
      });
  }

  approve(member: Member): Observable<Member> {
    return this.http
      .post<Member>(CONFIG.membersUrl, member)
      .pipe(
        tap(() => {
          this.refreshData.next();
        })
      );
  }
}
