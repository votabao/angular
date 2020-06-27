import { Component, OnInit } from '@angular/core';

import {
  NgbDatepickerConfig,
  NgbActiveModal, NgbTimepickerConfig
} from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from '../../../core/services/modal.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventCalendar } from 'src/app/core/models/event-calendar';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { Router } from '@angular/router';
import { Attendance } from 'src/app/core/models/attendance';
import { CommonService } from 'src/app/core/services/common.service';
import { MemberService } from 'src/app/core/services/member.service';

export const ACTION = {
  update: 'update',
  delete: 'delete',
  attendance: 'attendance'
};

@Component({
  selector: 'app-modal-edit-event',
  templateUrl: './modal-edit-event.component.html',
  styleUrls: ['./modal-edit-event.component.styl']
})
export class ModalEditEventComponent implements OnInit {
  data: any = null;
  event: EventCalendar[];
  editForm = false;
  hideFormDetail = true;
  showEventAttendance = false;
  groupId;
  eventId;
  eventAttendance: Attendance[];
  memberRole;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: ModalService,
    private config: NgbDatepickerConfig,
    private eventService: EventService,
    private timeConfig: NgbTimepickerConfig,
    private attendanceService: AttendanceService,
    private router: Router,
    private service: CommonService,
    private memberService: MemberService
  ) {
    timeConfig.seconds = false;
    timeConfig.spinners = false;
  }

  updateEvent() {
    this.activeModal.close({
      action: ACTION.update,
      data: this.data
    });
  }

  ngOnInit() {
    this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
    this.getRole();
  }

  showEditForm() {
    this.editForm = !this.editForm;
    this.hideFormDetail = !this.hideFormDetail;
  }

  showAttendanceForm(id) {
    this.eventId = id;
    this.attendanceService.getEventAttendance(this.groupId, id).subscribe(eventAttendance => {
      this.eventAttendance = eventAttendance;
      this.showEventAttendance = !this.showEventAttendance;
      this.hideFormDetail = !this.hideFormDetail;
    }, err => this.service.showErrorNotify('Not time to take attendance', 'Fail!'))
  }

  AddAtten() {
    this.attendanceService.addEventAttendance(this.eventAttendance, this.eventId, this.groupId).subscribe(() => {
      this.service.showSuccessNotify(`Added success !`, `Success`);
    });
    this.activeModal.close();
  }

  deleteEvent(id) {
    this.activeModal.close({
      action: ACTION.delete,
      data: this.data
    });
  }

  attendanceEvent() {
    this.activeModal.close({
      action: ACTION.attendance,
      data: this.data
    })
  }

  closeForm() {
    this.activeModal.dismiss();
  }

  getRole() {
    this.memberService.getRole(this.groupId).subscribe(memberRole => {
      this.memberRole = memberRole;
      console.log(memberRole);
    });
  }
}
