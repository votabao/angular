import {Component, OnDestroy, OnInit} from '@angular/core';

import { UserService } from '../../../core/services/user.service';
import { CONFIG } from '../../../shared/config';
import { User, GroupFollow, GroupLeft } from '../../../core/models/user';
import { Subscription } from 'rxjs';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: User;
  groupsFollow: GroupFollow[];
  groupsLeft: GroupLeft[];
  dateFormat = CONFIG.dateFormat;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subscription = this.userService.refreshData.subscribe(() => {
      this.getProfile();
    });
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe((informationUser: any) => {
      this.user = informationUser.user;
      this.groupsFollow = informationUser.groupListOfCurrentUserJoineds;
      this.groupsLeft = informationUser.groupListOfCurrentUserLeft;
      this.sendUser();
    });
  }

  sendUser() {
    this.userService.sendUser(this.user);
  }

  openEditModal() {
    this.userService.openModalEdit(EditProfileComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
