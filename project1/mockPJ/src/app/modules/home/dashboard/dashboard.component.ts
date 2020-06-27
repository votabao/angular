import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Course } from '../../../core/models/course';
import { CommonService } from '../../../core/services/common.service';
import { CourseService } from '../../../core/services/course.service';
import { ModalCreateCourseComponent } from '../modal-create-course/modal-create-course.component';
import {
  ModalEditCourseComponent,
  ACTION
} from '../modal-edit-course/modal-edit-course.component';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashBoardComponent implements OnInit {
  isLogin: boolean;
  courses: Course[];
  modalRef: NgbModalRef;
  selectedCourse: Course = new Course();
  title = 'Welcome to lsn';
  bgUrl = '../../../../assets/img/banner2.jpg';
  userEmail: string;
  
  constructor(
    private service: CommonService,
    private courseService: CourseService,
    private modalService: NgbModal,
    private router: Router,
    private modal: ModalService
  ) {}

  ngOnInit() {
    this.getCourses();
    const token = localStorage.getItem('token');
    this.userEmail = JSON.parse(localStorage.getItem('user')).email;
    this.isLogin = !!token;
  }

  accessDenied(courseID) {
    if (!this.isLogin) {
      this.service.showErrorNotify(null, 'You have to login first!');
      return;
    }
    this.router.navigate(['/course', courseID]);
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  createCourse() {
    this.modalService
      .open(ModalCreateCourseComponent as Component, {
        size: 'lg',
        centered: true
      })
      .result.then(course => {
        this.courseService.addCourse(course).subscribe(
          () => {
            this.getCourses();
            this.service.showSuccessNotify(
              `${course.name} was created`,
              'Success!'
            );
          },
          error => {
            this.service.showErrorNotify(`Error: name is existed`, 'Fail!');
          }
        );
      })
      .catch(err => {});
  }

  open(id) {
    this.courseService.getCourseById(id).subscribe(
      course => {
        this.modal.open(ModalEditCourseComponent, course).result.then(res => {
          if (res.action === ACTION.update) {
            this.editCourse(res.data, id);
          }
        });
      },
      err => {
        this.service.showErrorNotify('You have no permission to edit!', null);
      }
    );
  }

  editCourse(data, id) {
    data = {
      name: data.course.name,
      content: data.content
    };
    this.courseService.editCourse(data, id).subscribe(
      data => {
        this.getCourses();
        this.service.showSuccessNotify('Edit course successfully', 'Success');
      },
      err => {
        this.service.showErrorNotify(`Error: name is existed`, 'Fail to edit');
      }
    );
  }
}
