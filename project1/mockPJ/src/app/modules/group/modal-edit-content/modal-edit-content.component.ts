import { Component, OnInit } from '@angular/core';

import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Content } from '../../../core/models/content';
import { CommonService } from '../../../core/services/common.service';
import { CONFIG } from '../../../shared/config';

@Component({
  selector: 'app-modal-edit-content',
  templateUrl: './modal-edit-content.component.html',
  styleUrls: ['./modal-edit-content.component.styl']
})
export class ModalEditContentComponent implements OnInit {
  apiKey = CONFIG.apiKey;
  data: any = null;
  modalRef: NgbModalRef;
  selectedContent: any = {};
  content: Content[];

  constructor(
    public activeModal: NgbActiveModal,
    private service: CommonService
  ) { }

  ngOnInit() {
    this.service.disablePastDay();
  }

  close() {
    this.activeModal.close(this.data);
  }
  closeModal() {
    this.activeModal.dismiss();
  }
  selectedDate(event, field) {
    this.data[field] = event;
  }
}
