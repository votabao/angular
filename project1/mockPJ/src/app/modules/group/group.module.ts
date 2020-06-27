import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorModule } from '@tinymce/tinymce-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupRoutingModule } from './group-routing.module';

import { ContentComponent } from './content/content.component';
import { MemberComponent } from './member/member.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberCalendarComponent } from './member/member-calendar/member-calendar.component';
import { InfoGroupComponent } from './member/info-group/info-group.component';
import { ImportantDocumentComponent } from './member/important-document/important-document.component';
import { MemberFormComponent } from './member/member-form/member-form.component';
import { PendingItemsComponent } from './pending-items/pending-items.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    ContentComponent,
    MemberComponent,
    MemberListComponent,
    MemberCalendarComponent,
    InfoGroupComponent,
    ImportantDocumentComponent,
    MemberFormComponent,
    PendingItemsComponent,
    MemberDetailComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    GroupRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    FormsModule
  ]
})
export class GroupModule { }
