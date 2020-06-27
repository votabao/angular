import { ModalAttendanceComponent } from './../modal-attendance/modal-attendance.component';
import { AttendanceService } from './../../../core/services/attendance.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { NgbModalRef, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { Content } from '../../../core/models/content';
import { ContentService } from 'src/app/core/services/content.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ModalService } from '../../../core/services/modal.service';
import { ModalEditContentComponent } from '../modal-edit-content/modal-edit-content.component';
import { ModalViewAllComponent } from './../modal-view-all/modal-view-all.component';
import { ModalDetailContentService } from 'src/app/core/services/modal-detail-content.service';
import { AvatarCoverService } from 'src/app/core/services/avatar-cover.service';
import { MemberService } from 'src/app/core/services/member.service';
import { ModalCreateEventContentComponent } from '../modal-create-event-content/modal-create-event-content.component';
import { EventService } from 'src/app/core/services/event.service';
import { EventCalendar } from 'src/app/core/models/event-calendar';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.styl']
})
export class ContentComponent implements OnInit {
  plStartDate = 'Start Date';
  plEndDate = 'End Date';
  param;
  bgUrl: string;
  backgroundContent = null;
  contents: Content[] = [];
  bindingContent = '';
  active = 1;
  modalRef: NgbModalRef;
  dataContent: any = {
    currentDate: this.contentService.convertDateToObject(new Date),
    startDate: null,
    endDate: null,
  };
  content: Content
  selectedContent: Content = new Content();
  groupId;
  contentId;
  memberRole;
  event: any;
  sanitizer: DomSanitizer


  constructor(
    private contentService: ContentService,
    private attendanceService: AttendanceService,
    private service: CommonService,
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute,
    private avatarService: AvatarCoverService,
    private modalService: ModalService,
    private modalDetail: ModalDetailContentService,
    private router: Router,
    private memberService: MemberService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupID');
      this.contentId = params.get('contentID')
    });
    this.contentService.refresh.subscribe(() => {
      this.getContents();
    });
    this.getContents();
    this.getCoverImage();
    this.getRole();
  }

  createNewContent() {
    this.contentService.addContent(this.dataContent, this.groupId).subscribe((contents: any) => {
      this.service.showSuccessNotify(`${this.dataContent.title} was created`, 'Success!');
      this.dataContent = {
        currentDate: this.contentService.convertDateToObject(new Date),
        startDate: '',
        endDate: '',
      }
      if (this.memberRole.role !== 'CAPTAIN') {
        this.router.navigate([`group/${this.groupId}/pending-items`]).then(() => { });
      } else {
        location.reload();
      }
    }, error => {
      if (error.status === 409) {
        this.service.showErrorNotify('Duplicate title', 'Create content fail !!')
      }
      if (error.status === 400) {
        this.service.showErrorNotify('Please fill all the blank', 'Create content fail !!')
      }
    }
    );
  }

  selectedDate(event, field) {
    this.dataContent[field] = event;
  }


  open(contentId) {
    this.contentService.getContentById(contentId).subscribe((content: Content) => {
      this.content = content;
      this.content.startDate = this.contentService.convertDateToObject(content.startDate);
      this.content.endDate = this.contentService.convertDateToObject(content.endDate);
      this.modalService.openContent(ModalEditContentComponent as Component, content).result.then(res => {
        this.updateContent(res, contentId);
      }, dismiss => { });
    });
  }

  openView(id) {
    this.contentService.getContentById(id).subscribe(content => {
      this.modalDetail.open(ModalViewAllComponent as Component, content);
    })
  }

  updateContent(data, contentId) {
    this.contentService.updateContent(data, this.groupId, contentId).subscribe(content => {
      this.getContents();
      this.service.showSuccessNotify(`${data.title} was updated`, 'Success!')
    }, error => {
      this.service.showErrorNotify('Error', 'Fail!');
    });
  }

  deleteContent(contentId) {
    const delContent = window.confirm("Are you sure delete this content?");
    if (delContent) {
      this.contentService.removeContent(this.groupId, contentId);
    }
  }

  getContents() {
    this.contentService.getContents(this.groupId).subscribe(contents => {
      this.contents = contents;
      // this.contents.forEach(eachContent => {
      //   if (eachContent.content.length > 300) {
      //     const shortedContent = eachContent.content.substring(0, 300) + '...';
      //     eachContent.content = shortedContent;
      //     // eachContent.content = this.sanitizer.sanitize(SecurityContext.STYLE, shortedContent);
      //   }
      // })
    });
  }

  onSelect(content: Content): void {
    this.selectedContent = this.cloneData(content);
  }

  cloneData(src) {
    return Object.assign({}, src);
  }

  getCoverImage() {
    this.avatarService.getCoverImg(this.groupId).subscribe(bgUrl => {
      this.bgUrl = bgUrl.coverImageUrl;
      this.backgroundContent = {
        'background-image': 'linear-gradient(45deg, rgba(75, 117, 160, 0.6) 55%, rgba(45,95,93,0.7)), url(' + this.bgUrl + ')'
      };
    });
  }
  openAtten(id) {
    this.contentId = id;
    this.attendanceService.getAttendance(this.groupId, id).subscribe(attendance => {
      attendance.push(this.contentId);
      this.modalService.openContent(ModalAttendanceComponent as Component, attendance);
    }, error => {
      if (error.status === 500) {
        this.service.showErrorNotify('Not time to take attendance', 'Open fail !!!')
      }
    })
  }

  getRole() {
    this.memberService.getRole(this.groupId).subscribe(memberRole => {
      this.memberRole = memberRole;
    });
  }

  createEventForContent(contentId) {
    this.contentId = contentId;
    this.modalService
      .open(ModalCreateEventContentComponent as Component, {
        size: 'lg',
        centered: true
      })
      .result.then(data => {
        this.event = {
          title: data.title,
          description: data.content,
          document: data.link,
          speaker: data.speaker,
          timeStart: data.startTime,
          timeEnd: data.duration,
          startDate: new Date(data.startDate.year + '-' + data.startDate.month + '-' + data.startDate.day)
        };
        this.addEvent(this.event, this.contentId);
      })
      .catch(err => { });
  }

  addEvent(event: EventCalendar, contentId) {
    this.eventService.addEventForContent(event, this.groupId, contentId).subscribe(
      () => {
        this.service.showSuccessNotify(null, 'Create event success!');
      },
      err => {
        this.service.showErrorNotify(null, 'Unable to add event!');
      }
    );
  }
}
