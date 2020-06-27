import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Course, AddCourse } from '../../../core/models/course';
import { CommonService } from '../../../core/services/common.service';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashBoardComponent implements OnInit {
  isLogin: boolean;
  courses: Course[];
  modalRef: NgbModalRef;
  title = 'Welcome to lsn';
  bgUrl = '../../../../assets/img/banner2.jpg';

  constructor(
    private service: CommonService,
    private courseService: CourseService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isLogin = !!token;
    this.getCourses();
  }

  accessDenied() {
    if (!this.isLogin) {
      this.service.showErrorNotify(null, 'You have to login first!');
      return;
    }
    this.router.navigate(['/course/{{course.id}}']);
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {
      size: 'lg',
      centered: true
    });
  }

  createCourse(createdCourse: AddCourse) {
    this.courseService.addCourse(createdCourse).subscribe(
      () => {
        this.service.showSuccessNotify(
          `${createdCourse.name} was created`,
          'Success!'
        );
        this.modalRef.close();
        this.getCourses();
      },
      error => {
        this.service.showErrorNotify(`Error ${error.statusText}`, 'Fail!');
      }
    );
  }
}
