import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-remove',
  templateUrl: './modal-confirm-remove.component.html',
  styleUrls: ['./modal-confirm-remove.component.css']
})
export class ModalConfirmRemoveComponent implements OnInit {
  mode = false;

  constructor(private  activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  confirm() {
    this.mode = !this.mode;
    this.activeModal.close(this.mode);
  }

  closeForm() {
    this.activeModal.close(this.mode);
  }

}
