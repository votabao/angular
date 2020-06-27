import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AddCourse } from 'src/app/core/models/course';

@Component({
  selector: 'app-modal-create-course',
  templateUrl: './modal-create-course.component.html',
  styleUrls: ['./modal-create-course.component.styl']
})
export class ModalCreateCourseComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  createCourse(course: AddCourse) {
    this.activeModal.close(course);
  }

  closeModalCreateCourse() {
    this.activeModal.dismiss();
  }
}
