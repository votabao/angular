import { Component, OnInit, ViewChild } from '@angular/core';

import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { OptionsInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CONFIG } from '../../../shared/config';
import { EventService } from 'src/app/core/services/event.service';
import { CommonService } from 'src/app/core/services/common.service';
import { EventCalendar } from '../../../core/models/event-calendar';
import { ModalEditEventComponent, ACTION } from '../modal-edit-event/modal-edit-event.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { MemberService } from 'src/app/core/services/member.service';
import { ModalCreateEventComponent } from '../modal-create-event/modal-create-event.component';
declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.styl']
})
export class CalendarComponent implements OnInit {
  eventId = 197;
  groupId;
  contentId;
  dateFormat = CONFIG.dateFormat;
  options: OptionsInput;
  event: any = {};
  month: any;
  date: any;
  events: EventCalendar[];
  eventsModel: any;
  modalRef: NgbModalRef;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  eventAmount: any = [];
  memberRole;
  updateData: any;

  @ViewChild('fullcalendar', { static: false })
  fullcalendar: FullCalendarComponent;

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private service: CommonService,
    private modal: ModalService,
    private router: Router,
    private attendanceService: AttendanceService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
    this.options = {
      editable: true,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      plugins: [dayGridPlugin, interactionPlugin]
    };
    this.getEvents();
    this.getRole();
  }

  getRole() {
    this.memberService.getRole(this.groupId).subscribe(memberRole => this.memberRole = memberRole)
  }

  getEvents(): void {
    this.eventService.getEvents(this.groupId).subscribe(events => {
      console.log(events)
      this.events = this.showEventHistory(events);
      const eventClone = [];
      events.forEach(event => {
        const e = {
          id: event.id,
          title: event.title,
          start: new Date(event.startDate),
          description: event.content,
          document: event.document,
          speaker: event.speaker,
          timeStart: event.startTime,
          timeEnd: event.endTime,
          duration: event.duration
        };
        eventClone.push(e);
      });
      this.calendarEvents = eventClone;
      console.log(this.calendarEvents)

    });
  }

  showEventHistory(events) {
    events = events.filter(
      event =>
        this.getDate(new Date(event.startDate)) < this.getDate(new Date())
    );
    events.sort(
      (a, b) =>
        this.getDate(new Date(b.startDate)) -
        this.getDate(new Date(a.startDate))
    );
    return events;
  }

  addEvent(event: EventCalendar) {
    this.eventService.addEvent(event, this.groupId).subscribe(
      () => {
        this.getEvents();
        this.service.showSuccessNotify(null, 'Create event success!');
      },
      err => {
        this.service.showErrorNotify(null, 'Unable to add event!');
      }
    );
  }

  getDate(dates) {
    this.month = dates.getMonth();
    this.date = dates.getDate();
    if (dates.getMonth() < 10) {
      this.month = '0' + dates.getMonth();
    }
    if (dates.getDate() < 10) {
      this.date = '0' + dates.getDate();
    }
    return (
      dates.getFullYear().toString() +
      this.month.toString() +
      this.date.toString()
    );
  }

  openCreateEvent(event) {
    if (this.memberRole.role === 'NO_MEMBER') {
      this.service.showErrorNotify('You are not member!', 'Error');
      return
    }
    if (this.getDate(event.date) < this.getDate(new Date())) {
      this.service.showErrorNotify(
        'Event must be greater or equal current date!',
        'Attention'
      );
      return;
    }
    const validateEvent = this.validateEventAmount(event.date);
    if (!validateEvent) {
      return;
    }
    this.modalService
      .open(ModalCreateEventComponent as Component, {
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
          startDate: event.date
        };
        this.addEvent(this.event);
      })
      .catch(err => { });
  }

  updateEvent(data, id) {
    this.updateData = {
      id: data.id,
      title: data.title,
      description: data.content,
      document: data.document,
      speaker: data.speaker,
      startTime: data.startTime,
      endTime: data.endTime,
    }
    this.eventService.updateEvent(this.updateData, id, this.groupId).subscribe(event => {
      this.service.showSuccessNotify('Edit successfully', 'Success!!');
      this.getEvents();
    }, error => {
    }
    );
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(this.groupId, id).subscribe(() => {
      this.service.showSuccessNotify('Delete Successfully !!', 'Success!!');
      this.getEvents();
    }, error => {
      this.service.showErrorNotify('You have no permission to Delete!', 'Fail!!');
    }
    );
  }

  openEventDetail(event) {
    event = {
      id: event.event.id,
      title: event.event._def.title,
      content: event.event._def.extendedProps.description,
      document: event.event._def.extendedProps.document,
      speaker: event.event._def.extendedProps.speaker,
      startTime: event.event._def.extendedProps.timeStart,
      endTime: event.event._def.extendedProps.timeEnd
    }
    this.modal.open(ModalEditEventComponent, event).result.then(res => {
      if (res.action === ACTION.update) {
        this.updateEvent(res.data, event.id);
      } else if (res.action === ACTION.delete) {
        if (confirm('Are you sure to delete!')) {
          this.deleteEvent(event.id);
        } else {
          return false;
        }
      }
    }, dismiss => {
    });
  }

  validateEventAmount(startDate) {
    this.eventAmount = this.calendarEvents.filter(
      event => this.getDate(event.start) == this.getDate(startDate)
    );
    if (this.eventAmount.length >= 6) {
      this.service.showErrorNotify(
        'The total number of events is less than 6!',
        'attention'
      );
      return false;
    }
    return true;
  }

  // getAttendance() {
  //   this.attendanceService.getEventAttendance(this.groupId, this.eventId).subscribe(eventAttendance => {
  //     console.log(eventAttendance)
  //   })
  // }

}
