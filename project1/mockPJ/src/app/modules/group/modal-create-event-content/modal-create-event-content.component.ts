import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbActiveModal, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { EventCalendar } from '../../../core/models/event-calendar';

@Component({
  selector: 'app-modal-create-event-content',
  templateUrl: './modal-create-event-content.component.html',
  styleUrls: ['./modal-create-event-content.component.styl']
})
export class ModalCreateEventContentComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private timeConfig: NgbTimepickerConfig
  ) {
    timeConfig.seconds = false;
    timeConfig.spinners = false;
   }

  ngOnInit() {
  }

  addEvent(event: EventCalendar) {
    console.log(event)
    this.activeModal.close(event);
  }

  closeModalAddEvent() {
    this.activeModal.dismiss();
  }

}
