import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { AddCourse, Course } from '../models/course';
import { CONFIG } from 'src/app/shared/config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private refreshData = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(CONFIG.courseUrl);
  }

  addCourse(course: AddCourse): Observable<any> {
    return this.http.post(CONFIG.addCourseUrl, course);
  }

  editCourse(course: any, id): Observable<any> {
    const params = { courseID: id };
    return this.http.put(CONFIG.editCourse, course, { responseType: 'text', params });
  }

  getCourseById(id) {
    const params = { courseID: id };
    return this.http.get(CONFIG.courseId, { params });
  }
}
