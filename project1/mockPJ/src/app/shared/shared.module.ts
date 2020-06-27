import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderOnlyLayoutComponent } from './components/layout/header-only-layout/header-only-layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { GroupHeaderLayoutComponent } from './components/layout/group-header-layout/group-header-layout.component';
import { GroupHeaderComponent } from './components/layout/group-header/group-header.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbModule],
  declarations: [HeaderOnlyLayoutComponent, HeaderComponent, GroupHeaderLayoutComponent, GroupHeaderComponent]
})
export class SharedModule { }
