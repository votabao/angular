import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbActiveModal, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { EventCalendar } from '../../../core/models/event-calendar';

@Component({
  selector: 'app-modal-create-event',
  templateUrl: './modal-create-event.component.html',
  styleUrls: ['./modal-create-event.component.styl']
})
export class ModalCreateEventComponent implements OnInit {
  modalRef: NgbModalRef;
  constructor(
    private activeModal: NgbActiveModal,
    private timeConfig: NgbTimepickerConfig
  ) {
    timeConfig.seconds = false;
    timeConfig.spinners = false;
  }

  ngOnInit() { }

  addEvent(event: EventCalendar) {
    this.activeModal.close(event);
  }

  closeModalAddEvent() {
    this.activeModal.dismiss();
  }
}
