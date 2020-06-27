
import { AvatarCoverService } from 'src/app/core/services/avatar-cover.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Attendance } from './../../../core/models/attendance';
import { CommonService } from './../../../core/services/common.service';
import { AttendanceService } from './../../../core/services/attendance.service';

@Component({
  selector: 'app-modal-listattendance-content',
  templateUrl: './modal-listattendance-content.component.html',
  styleUrls: ['./modal-listattendance-content.component.styl']
})
export class ModalListattendanceContentComponent implements OnInit {
  modalRef: NgbModalRef;
  bgUrl: string;
  backgroundContent = null;
  data: any = null;
  note: any;
  listAttendance: any;
  groupId;
  id: any;
  attendance: Attendance[];

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private service: CommonService,
    private avatarService: AvatarCoverService,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit() {
    this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
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
}
