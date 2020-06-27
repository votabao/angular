import { Injectable } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: NgbModal) { }

  open(component, data): NgbModalRef {
    const modalRef = this.modalService.open(component, {
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.data = this.clone(data);
    return modalRef;
  }

  openContent(component, data): NgbModalRef {
    const modalRef = this.modalService.open(component, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.data = this.clone(data);
    return modalRef;
  }

  clone(data) {
    return Object.assign({}, data);
  }

}
