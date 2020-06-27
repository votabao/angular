import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-edit-event',
  templateUrl: './modal-edit-event.component.html',
  styleUrls: ['./modal-edit-event.component.css']
})
export class ModalEditEventComponent implements OnInit {
  data: any = null;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  editEvent() {
    this.activeModal.close(this.data);
  }

  closeForm() {
    this.activeModal.close({});
  }
}
