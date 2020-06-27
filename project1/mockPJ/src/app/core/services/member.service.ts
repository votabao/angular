import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from './common.service';

import { Member } from '../models/member';
import { CONFIG } from '../../shared/config';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  refreshData = new Subject();

  constructor(
    private http: HttpClient,
    private notify: CommonService
  ) { }

  getMembers(groupId, memberId): Observable<Member[]> {
    const params = { groupID: groupId, memberID: memberId };
    return this.http.get<Member[]>(CONFIG.membersUrl, { params });
  }

  getMemberByID(memberId): Observable<Member> {
    const params = { memberID: memberId };
    return this.http.get<Member>(CONFIG.memberDetailUrl, { params });
  }

  getUsersLoggedIn(groupId): Observable<User[]> {
    const params = { groupID: groupId };
    return this.http.get<User[]>(CONFIG.userLoggedIn, { params });
  }

  addUser(user: User, groupId) {
    const params = { groupID: groupId };
    return this.http.post(CONFIG.addUser, user, { responseType: 'text', params })
      .pipe(tap(() => {
        this.refreshData.next();
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      })
      );
  }

  removeMember(memberId, groupId, message, title) {
    const params = { memberID: memberId, groupID: groupId };
    this.http.delete(CONFIG.removeMemberUrl, { responseType: 'text', params })
      .subscribe(() => {
        this.notify.showSuccessNotify(message, title);
        this.refreshData.next();
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      });
  }

  setCaptain(memberId, groupId) {
    const params = { memberID: memberId, groupID: groupId };
    return this.http.put(CONFIG.setCaptainUrl, {}, { responseType: 'text', params })
      .subscribe(() => {
        this.notify.showSuccessNotify('Set Captain Success', 'Success');
        this.refreshData.next();
        location.reload();
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      });
  }

  removeMentor(memberId, groupId) {
    const params = { mentorID: memberId, groupID: groupId };
    return this.http.put(CONFIG.removeMentorUrl, {}, { responseType: 'text', params })
      .subscribe(() => {
        this.notify.showSuccessNotify('Remove Mentor Success', 'Success');
        this.refreshData.next();
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      });
  }

  setMentor(memberId, groupId) {
    const params = { memberID: memberId, groupID: groupId };
    return this.http.put(CONFIG.setMentorUrl, {}, { responseType: 'text', params })
      .subscribe(() => {
        this.notify.showSuccessNotify('Set Mentor Success', 'Success');
        this.refreshData.next();
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      });
  }

  getPendingUsers(groupId): Observable<Member[]> {
    const params = { groupID: groupId };
    return this.http.get<Member[]>(CONFIG.pendingUrl, { params });
  }

  declineUser(memberId, groupId, message, title) {
    const params = { memberID: memberId, groupID: groupId };
    this.http.delete(CONFIG.declinePendingUser, { responseType: 'text', params })
      .subscribe(() => {
        this.notify.showSuccessNotify(message, title);
        this.refreshData.next();
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      });
  }

  approveUser(memberId, groupId): Observable<Member> {
    const params = { memberID: memberId, groupID: groupId };
    return this.http.put<Member>(CONFIG.approvePendingUser, {}, { params })
      .pipe(tap(() => {
        this.refreshData.next();
        this.notify.showSuccessNotify(`Approve Success!`, 'Success!');
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      })
      );
  }

  declineContent(contentId, groupId, message, title) {
    const params = { groupID: groupId, contentID: contentId };
    this.http.delete(CONFIG.declinePendingContent, { responseType: 'text', params })
      .subscribe(() => {
        this.notify.showSuccessNotify(message, title);
        this.refreshData.next();
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      });
  }

  approveContent(contentId, groupId): Observable<Member> {
    const params = { groupID: groupId, contentID: contentId };
    return this.http.put<Member>(CONFIG.approvePendingContent, {}, { params })
      .pipe(tap(() => {
        this.refreshData.next();
        this.notify.showSuccessNotify(`Approve Success!`, 'Success!');
      }, err => {
        if (err.status === 406) {
          this.notify.showErrorNotify(`You have no permission`, 'Fail!');
        }
      })
      );
  }

  getRole(groupId): Observable<any> {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.getRole, { params });
  }

  getCover(groupId): Observable<any> {
    const params = { groupID: groupId };
    return this.http.get(CONFIG.coverImg, { params });
  }
}
