import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { BannerComponent } from './banner/banner.component';
import { ModalCreateCourseComponent } from './modal-create-course/modal-create-course.component';
import { ModalEditCourseComponent } from './modal-edit-course/modal-edit-course.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserService } from '../../core/services/user.service';

@NgModule({
  declarations: [
    DashBoardComponent,
    CourseDetailsComponent,
    BannerComponent,
    ModalCreateCourseComponent,
    ModalEditCourseComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  entryComponents: [ModalCreateCourseComponent, EditProfileComponent, ModalEditCourseComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
    ],
  providers: [UserService]
})
export class HomeModule {}
