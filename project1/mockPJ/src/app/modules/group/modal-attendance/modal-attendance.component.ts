
import { AvatarCoverService } from 'src/app/core/services/avatar-cover.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Attendance } from './../../../core/models/attendance';
import { CommonService } from './../../../core/services/common.service';
import { AttendanceService } from './../../../core/services/attendance.service';

@Component({
  selector: 'app-modal-attendance',
  templateUrl: './modal-attendance.component.html',
  styleUrls: ['./modal-attendance.component.styl']
})
export class ModalAttendanceComponent implements OnInit {
  modalRef: NgbModalRef;
  bgUrl: string;
  backgroundContent = null;
  data: any = null;
  listAttendance: any;
  groupId;
  id: any;
  attendance: Attendance[];

  constructor(
    public activeModal: NgbActiveModal,
    private route: Router,
    private service: CommonService,
    private avatarService: AvatarCoverService,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit() {
    this.groupId = this.route.url.substring(7, this.route.url.lastIndexOf('/'))
    this.attendance = Object.values(this.data);
    this.id = this.attendance[this.attendance.length - 1];
    this.attendance.pop();
    this.getCoverImage();
  }

  getCoverImage() {
    this.avatarService.getCoverImg(this.groupId).subscribe(bgUrl => {
      this.bgUrl = bgUrl.coverImageUrl;
      this.backgroundContent = {
        'background-image': 'linear-gradient(45deg, rgba(75, 117, 160, 0.6) 55%, rgba(45,95,93,0.7)), url(' + this.bgUrl + ')'
      };
    });
  }

  AddAtten() {
    this.attendanceService.addAttendance(this.attendance, this.groupId, this.id).subscribe(() => {
      this.service.showSuccessNotify(`Added success !`, `Success`);
    });
    this.activeModal.close(this.attendance);
  }
}
