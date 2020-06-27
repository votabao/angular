import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MemberService } from '../../../../core/services/member.service';
import { CommonService } from '../../../../core/services/common.service';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.styl']
})
export class MemberFormComponent implements OnInit {
  memberRole;
  @Input() groupId;
  myForm: FormGroup;
  disabled = false;
  users;
  selectedItems;
  dropdownSettings: any = {};

  constructor(
    private memberService: MemberService,
    private service: CommonService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      itemsShowLimit: 1,
      allowSearchFilter: true,
      textField: 'email',
      idField: 'id'
    };

    this.memberService.refreshData.subscribe(() => {
      this.getUserLoggedIn();
    });
    this.getUserLoggedIn();

    this.myForm = this.fb.group({
      email: new FormControl(null, [Validators.required])
    });

    this.getRole();
  }

  addUser(user) {
    this.memberService.addUser(user, this.groupId).subscribe(() => {
      this.service.showSuccessNotify(`Added success !`, `Success`);
      this.selectedItems = [];
      if (this.memberRole.role !== 'CAPTAIN') {
        this.router.navigate([`group/${this.groupId}/pending-items`]).then(() => { });
      }
    });
  }

  getRole() {
    this.memberService.getRole(this.groupId).subscribe(memberRole => {
      this.memberRole = memberRole;
    });
  }

  getUserLoggedIn() {
    this.memberService.getUsersLoggedIn(this.groupId).subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
