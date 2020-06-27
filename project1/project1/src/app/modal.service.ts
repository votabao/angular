import {Injectable} from '@angular/core';
import '@angular/localize/init';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: NgbModal) {
  }

  open(component, data): NgbModalRef {
    const modalRef = this.modalService.open(component, {
      size: 'md',
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.data = this.clone(data);
    return modalRef;
  }

  openFormRemove(component): NgbModalRef {
    const modalRef = this.modalService.open(component, {
      size: 'md',
      centered: true,
      backdrop: 'static'
    });
    return modalRef;
  }

  clone(data) {
    return Object.assign({}, data);
  }

}
