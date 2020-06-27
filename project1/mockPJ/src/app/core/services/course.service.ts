import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AddCourse, Course } from '../models/course';
import { CONFIG } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(CONFIG.courseUrl);
  }

  addCourse(course: AddCourse): Observable<any> {
    return this.http.post(CONFIG.courseUrl, course);
  }
}
