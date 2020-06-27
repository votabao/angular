
import { AvatarCoverService } from 'src/app/core/services/avatar-cover.service';
import { ModalListattendanceContentComponent } from './../modal-listattendance-content/modal-listattendance-content.component';
import { ModalAttendanceComponent } from './../modal-attendance/modal-attendance.component';
import { AttendanceService } from './../../../core/services/attendance.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModalRef, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { Content } from '../../../core/models/content';
import { ContentService } from 'src/app/core/services/content.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ModalService } from '../../../core/services/modal.service';
import { ModalEditContentComponent } from '../modal-edit-content/modal-edit-content.component';
import { ModalViewAllComponent } from './../modal-view-all/modal-view-all.component';
import { ModalDetailContentService } from 'src/app/core/services/modal-detail-content.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.styl']
})
export class AttendanceComponent implements OnInit {
  contents: Content[] = [];
  bgUrl: string;
  backgroundContent = null;
  eventsAttendance: any;
  bindingContent = '';
  active = 1;
  modalRef: NgbModalRef;
  viewAllActive = true;
  content: Content
  selectedContent: Content = new Content();
  groupId;
  contentId;
  eventId;
  membersEvent: any;

  constructor(
    private modalService: ModalService,
    private modalDetail: ModalDetailContentService,
    private contentService: ContentService,
    private config: NgbDatepickerConfig,
    private attendanceService: AttendanceService,
    private service: CommonService,
    private avatarService: AvatarCoverService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupID');
    });
    this.contentService.refresh.subscribe(() => {
      this.getContents();
    });
    this.getContents();
    this.getEventsAtendance();
    this.getCoverImage();
  }

  openAtendanceEventMember(eventId) {
    this.eventId = eventId;
    this.attendanceService.getAtendanceEventMemberUrl(this.groupId, eventId).subscribe((membersEvent: any) => {
      membersEvent.push(this.eventId);
      console.log('membersEvent', membersEvent)
      this.modalService.openContent(ModalListattendanceContentComponent as Component, membersEvent);
    })
  }

  getEventsAtendance() {
    this.attendanceService.getEventsAtendance(this.groupId).subscribe((eventsAttendance: any) => {
      this.eventsAttendance = eventsAttendance.eventOfGroup;
    })
  }

  getContents() {
    this.contentService.getListAttendContent(this.groupId).subscribe(contents => {
      this.contents = contents;
    });
  }

  onSelect(content: Content): void {
    this.selectedContent = this.cloneData(content);
  }

  cloneData(src) {
    return Object.assign({}, src);
  }

  openAtten(id) {
    this.contentId = id;
    this.attendanceService.getHistoryAttendance(this.groupId, id).subscribe(attendance => {
      attendance.push(this.contentId);
      this.modalService.openContent(ModalListattendanceContentComponent as Component, attendance);
    })
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
