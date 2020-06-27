import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.styl']
})
export class EventComponent implements OnInit {
  modalRef: NgbModalRef;

  constructor(
    private service: CommonService,
    private modalService: NgbModal
  ) {
    this.service.disablePastDay();
  }

  ngOnInit() {
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {
      size: 'lg',
      centered: true
    });
  }

}

