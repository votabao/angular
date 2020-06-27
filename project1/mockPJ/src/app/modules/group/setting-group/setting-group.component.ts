import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupService } from 'src/app/core/services/group.service';
import { CommonService } from 'src/app/core/services/common.service';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'app-setting-group',
  templateUrl: './setting-group.component.html',
  styleUrls: ['./setting-group.component.styl']
})
export class SettingGroupComponent implements OnInit {
  memberRole;
  updateForm: FormGroup;
  groupInfo: any = {};
  groupId;
  constructor(
    private groupService: GroupService,
    private router: Router,
    private fb: FormBuilder,
    private service: CommonService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
    this.getGroupById();
    this.getRole();
  }

  getGroupById() {
    this.groupService.getGroupById(this.groupId).subscribe(group => {
      this.groupInfo = group;
      this.updateForm = this.fb.group({
        name: [this.groupInfo.name, Validators.required],
        description: [this.groupInfo.description, Validators.required]
      })
    })
  }

  editGroup() {
    const formData = new FormData();
    formData.append('nameGroup', this.updateForm.get('name').value);
    formData.append('description', this.updateForm.get('description').value);
    this.groupService.editGroup(formData, this.groupId).subscribe(() => {
      this.service.showSuccessNotify('Edit Sucessfully', 'Success!');
      this.router.navigate([`/group/${this.groupId}/content`]);
      setTimeout(() => {
        location.reload()
      }, 1000);
    }
    );
  }

  getRole() {
    this.memberService.getRole(this.groupId).subscribe(memberRole => {
      this.memberRole = memberRole;
    });
  }
}
