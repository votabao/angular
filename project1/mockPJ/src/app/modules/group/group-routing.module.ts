import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { MemberComponent } from './member/member.component';
import { GroupHeaderLayoutComponent } from '../../shared/components/layout/group-header-layout/group-header-layout.component';
import { PendingItemsComponent } from './pending-items/pending-items.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {
    path: '',
    component: GroupHeaderLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: ':groupID/content',
        pathMatch: 'full'
      },
      {
        path: ':groupID/content',
        component: ContentComponent
      },
      {
        path: ':groupID/member',
        component: MemberComponent
      },
      {
        path: ':groupID/member/:memberID',
        component : MemberDetailComponent
      },
      {
        path: ':groupID/pending-items',
        component: PendingItemsComponent
      },
      {
        path: ':groupID/event',
        component: EventComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
