import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../core/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.styl']
})
export class EditProfileComponent implements OnInit {
  editProfile: FormGroup;
  user;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private service: CommonService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });

    this.editProfile = this.fb.group({
      fullName: [this.user.fullName, Validators.required],
      skype: [this.user.skype, Validators.required],
      dateOfBirth: [this.user.dateOfBirth, Validators.required],
      introduce: [this.user.introduce, Validators.required],
      profile: [null]
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.setValueProfile(event);
    }
  }

  setValueProfile(event) {
    const file = event.target.files[0];
    this.editProfile.get('profile').setValue(file);
  }

  uploadProfile() {
    const formData = new FormData();
    formData.append('fullName', this.editProfile.get('fullName').value);
    formData.append('skype', this.editProfile.get('skype').value);
    formData.append('dateOfBirth', this.editProfile.get('dateOfBirth').value);
    formData.append('introduce', this.editProfile.get('introduce').value);
    formData.append('file', this.editProfile.get('profile').value);

    this.userService.uploadProfile(formData).subscribe(() => {
      this.service.showSuccessNotify('Updated', 'Success');
      this.activeModal.close();
    });
  }

}
