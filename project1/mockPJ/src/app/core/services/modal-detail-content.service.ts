import { Injectable } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalDetailContentService {

  constructor(private modalService: NgbModal) { }

  open(component, data): NgbModalRef {
    const modalRef = this.modalService.open(component, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.data = this.clone(data);
    return modalRef;
  }

  clone(data) {
    return Object.assign({}, data);
  }
}
