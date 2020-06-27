import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Course } from '../../../core/models/course';
import { CommonService } from '../../../core/services/common.service';
import { Group } from '../../../core/models/group';
import { CONFIG } from '../../../shared/config';
import { CourseService } from 'src/app/core/services/course.service';
import { GroupService } from 'src/app/core/services/group.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.styl']
})

export class CourseDetailsComponent implements OnInit {
  dateFormat = CONFIG.dateFormat;
  @Input() course: Course;
  courseID;
  courses: Course[];
  groupComing = [];
  groupRunning = [];
  modalRef: NgbModalRef;
  title = 'Course';
  bgUrl = '../../../../assets/img/banner.jpg';

  constructor(
    private courseService: CourseService,
    private groupService: GroupService,
    private service: CommonService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.service.disablePastDay();
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses: Course[]) => {
      this.courses = courses;
    });

    this.route.paramMap.subscribe(params => {
      this.courseID = params.get('id');
      this.groupService.getGroupsById(this.courseID).subscribe((matchGroup: Group[]) => {
        for (let i = 0; i < matchGroup.length; i++) {
          const getStartDate: any = new Date(new Date(matchGroup[i].startDate));
          if (this.service.getCurrentDate() - getStartDate < 0) {
            this.groupComing.push(matchGroup[i]);
          } else if (this.service.getCurrentDate() - getStartDate >= 0) {
            this.groupRunning.push(matchGroup[i]);
          }
        }
        this.sortDate(this.groupComing);
        this.sortDate(this.groupRunning);
      });
    });
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {
      size: 'lg',
      centered: true
    });
  }

  createGroup(createdGroup: Group) {
    this.groupService.addGroup(createdGroup, this.courseID).subscribe(() => {
      this.service.showSuccessNotify(`${createdGroup.name} was created`, 'Success!');
      this.modalRef.close();
    },
      error => {
        this.service.showErrorNotify(`Error ${error.statusText}`, 'Fail!');
      });
  }

  sortDate(array) {
    return array.sort((a, b) => {
      return <any>new Date(b.startDate) - <any>new Date(a.startDate) || a.name.localeCompare(b.name);
    });
  }
}

