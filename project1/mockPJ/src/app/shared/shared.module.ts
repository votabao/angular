import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderOnlyLayoutComponent } from './components/layout/header-only-layout/header-only-layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { GroupHeaderLayoutComponent } from './components/layout/group-header-layout/group-header-layout.component';
import { ModalService } from '../core/services/modal.service';
import { GroupHeaderComponent } from './components/layout/group-header/group-header.component';
import {InputDateComponent} from './components/input-date/input-date-component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbModule, FormsModule],
  exports: [InputDateComponent],
  declarations: [
    HeaderOnlyLayoutComponent,
    HeaderComponent,
    GroupHeaderComponent,
    GroupHeaderLayoutComponent,
    InputDateComponent
  ],
  providers: [ModalService]
})
export class SharedModule { }
