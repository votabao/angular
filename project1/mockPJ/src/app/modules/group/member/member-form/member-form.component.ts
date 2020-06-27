import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MemberService } from '../../../../core/services/member.service';
import { CommonService } from '../../../../core/services/common.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.styl']
})
export class MemberFormComponent implements OnInit {
  @Input() groupID;
  myForm: FormGroup;
  disabled = false;
  members = [];
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
    };

    this.members = [
      'quan.bui1.intern@ntq-solotion.com.vn',
      'bao.vo.intern@ntq-solotion.com.vn',
      'sang.nguyen.intern@ntq-solotion.com.vn',
      'tung.nguyen.intern@ntq-solotion.com.vn',
      'hanh.kieu.intern@ntq-solotion.com.vn'
    ];

    this.myForm = this.fb.group({
      email: new FormControl(null, [Validators.required]),
    });
  }

  addMember(member) {
    this.memberService.createMember(member).subscribe(() => {
      this.service.showSuccessNotify(`Added ${member.email[0]} success !`, `Success`);
      this.selectedItems = [];
      this.router.navigate([`group/${this.groupID}/pending-items`]).then(() => {});
    });
  }

}
