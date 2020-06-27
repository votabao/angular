import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorModule } from '@tinymce/tinymce-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';

import { SharedModule } from 'src/app/shared/shared.module';
import { GroupRoutingModule } from './group-routing.module';
import { ContentComponent } from './content/content.component';
import { MemberComponent } from './member/member.component';
import { ModalService } from '../../core/services/modal.service';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberCalendarComponent } from './member/member-calendar/member-calendar.component';
import { InfoGroupComponent } from './member/info-group/info-group.component';
import { ImportantDocumentComponent } from './member/important-document/important-document.component';
import { MemberFormComponent } from './member/member-form/member-form.component';
import { PendingItemsComponent } from './pending-items/pending-items.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { ModalEditEventComponent } from '../group/modal-edit-event/modal-edit-event.component';
import { CustomePipe, CustomeDate, CustomeDuration } from '../../shared/pipes/pipe';
import { CustomeStatus } from '../../shared/pipes/convert-status';
import { CalendarComponent } from './calendar/calendar.component';
import { ModalEditContentComponent } from './modal-edit-content/modal-edit-content.component';
import { ModalViewAllComponent } from './modal-view-all/modal-view-all.component';
import { ModalDetailContentService } from 'src/app/core/services/modal-detail-content.service';
import { SettingGroupComponent } from './setting-group/setting-group.component';
import { ModalAttendanceComponent } from './modal-attendance/modal-attendance.component';
import { ModalListattendanceContentComponent } from './modal-listattendance-content/modal-listattendance-content.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CreateEventContentComponent } from './create-event-content/create-event-content.component';
import { ModalCreateEventContentComponent } from './modal-create-event-content/modal-create-event-content.component';
import { ModalCreateEventComponent } from './modal-create-event/modal-create-event.component';
import { SafeHtml } from 'src/app/shared/pipes/safe-html';
import { ModalPendingContentComponent } from './modal-pending-content/modal-pending-content.component';
import { UserService } from 'src/app/core/services/user.service';

@NgModule({
  declarations: [
    ContentComponent,
    MemberComponent,
    ModalEditEventComponent,
    CustomePipe,
    CustomeStatus,
    CustomeDate,
    MemberListComponent,
    ModalEditContentComponent,
    MemberCalendarComponent,
    InfoGroupComponent,
    ImportantDocumentComponent,
    MemberFormComponent,
    PendingItemsComponent,
    MemberDetailComponent,
    CustomeDuration,
    ModalCreateEventComponent,
    CalendarComponent,
    MemberListComponent,
    ModalViewAllComponent,
    SettingGroupComponent,
    ModalAttendanceComponent,
    AttendanceComponent,
    ModalListattendanceContentComponent,
    CreateEventContentComponent,
    ModalCreateEventContentComponent,
    SafeHtml,
    ModalPendingContentComponent
  ],
  entryComponents: [
    ModalCreateEventComponent,
    ModalEditContentComponent,
    ModalEditEventComponent,
    ModalViewAllComponent,
    ModalAttendanceComponent,
    ModalListattendanceContentComponent,
    ModalCreateEventContentComponent,
    ModalPendingContentComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    GroupRoutingModule,
    SharedModule,
    FormsModule,
    FullCalendarModule,
    NgbModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
  ],
  providers: [ModalService, ModalDetailContentService, UserService]
})
export class GroupModule { }
