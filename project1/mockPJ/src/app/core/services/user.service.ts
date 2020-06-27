import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Member } from '../models/member';
import { CONFIG } from '../../shared/config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  refreshData = new Subject();

  private user = new BehaviorSubject('');
  currentUser = this.user.asObservable();
  modalRef: NgbModalRef;

  constructor(
    private http: HttpClient,
    private modal: NgbModal
  ) { }

  getProfile(): Observable<Member> {
    return this.http.get<Member>(CONFIG.profile);
  }

  uploadProfile(data): Observable<any> {
    return this.http.post(CONFIG.profileUrl, data).pipe(tap(() => {
      this.refreshData.next();
    }));
  }

  sendUser(user) {
    this.user.next(user);
  }

  openModalEdit(component) {
    this.modalRef = this.modal.open(component, {size: 'lg', centered: true});
  }
}
