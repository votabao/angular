import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export const ACTION = {
  update: 'update'
};

@Component({
  selector: 'app-modal-edit-course',
  templateUrl: './modal-edit-course.component.html',
  styleUrls: ['./modal-edit-course.component.styl']
})
export class ModalEditCourseComponent implements OnInit {
  data: any = null;
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  editCourse() {
    this.activeModal.close({
      action: ACTION.update,
      data: this.data
    });
  }

  closeForm() {
    this.activeModal.close({});
  }
}
