import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../../../../core/services/common.service';
import { GroupService } from '../../../../core/services/group.service';
import { CONFIG } from '../../../config';
import { AvatarCoverService } from 'src/app/core/services/avatar-cover.service';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.styl']
})
export class GroupHeaderComponent implements OnInit {
  ngStyle = null;
  groupAvatar: any = {};
  groupCover: any = {};
  imageURL: string;
  bgURL = '../../../../../assets/img/cover1.jpg';
  avatar: string;
  coverImg: string;
  showWantToLearn: boolean;
  showWaitting: boolean;
  showJoined: boolean;
  uploadForm: FormGroup;
  param;
  group;
  memberRole;
  DriversLicenseString: any;
  @ViewChild('fileImg', { static: true }) file: ElementRef;

  constructor(
    public fb: FormBuilder,
    private avatarService: AvatarCoverService,
    private service: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private memberService: MemberService
  ) {
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: [''],
      coverImage: ['']
    });
  }

  ngOnInit() {
    this.param = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
    this.groupService.getGroup(this.param).subscribe(group => {
      this.group = group;
    });

    this.getAvatar();
    this.getCoverImage();
    this.getStatusUserInGroup();
    this.getRole();
  }

  getRole() {
    this.memberService.getRole(this.param).subscribe(memberRole => this.memberRole = memberRole)
  }

  getStatusUserInGroup() {
    this.groupService.getStatusUserInGroup(this.param).subscribe(status => {
      console.log(status);
      switch (status) {
        case 'has_left':
          this.showWantToLearn = true;
          break;
        case 'Want to learn':
          this.showWantToLearn = true;
          break;
        case 'pending':
          this.showWaitting = true;
          break;
        case 'joined':
          this.showJoined = true;
          break;
      }
    });
  }

  leaveGroup() {
    this.groupService.leaveGroup(this.param).subscribe(
      message => {
        this.service.showSuccessNotify('Left the group', 'Success');
        this.showWantToLearn = !!message;
        this.showJoined = !message;
        location.reload();
      },
      err => this.service.showErrorNotify('Could not leave the group!', 'Error')
    );
  }

  joinGroup() {
    this.groupService.joinGroup(this.param).subscribe(
      message => {
        this.service.showSuccessNotify('Waiting for approvement', 'Success');
        this.showWaitting = !!message;
        this.showWantToLearn = !message;
      },
      err => this.service.showErrorNotify('Unable to join group!', 'Error')
    );
  }

  uploadCoverImg(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('coverImage').setValue(file);
    }
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('coverImage').value);
    this.avatarService.uploadCover(formData, this.param).subscribe(
      () => {
        this.service.showSuccessNotify('Change cover group success!', 'Success');
        setTimeout(() =>{ location.reload();}, 500)
      },
      err => this.service.showErrorNotify('Cannot upload cover', 'Error')
    );
  }

  getCoverImage() {
    this.avatarService.getCoverImg(this.param).subscribe(coverImg => {
      this.coverImg = coverImg.coverImageUrl;
      this.ngStyle = {
        'background-image': 'url(' + this.coverImg + ')'
      };
    });
  }

  getAvatar() {
    this.avatarService.getAvatar(this.param).subscribe(imageURL => {
      this.imageURL = imageURL;
    });
  }

  uploadAvatarImg(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const x = this.validateImageSize(file);
    if (!x) {
      return;
    }
    this.uploadForm.get('avatar').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.avatar = reader.result as string;
      this.groupAvatar.fileData = this.avatar;
      this.groupAvatar.fileName = file.name;
      this.uploadAvatar();
    };
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  uploadAvatar() {
    this.avatarService
      .uploadAvatar(this.groupAvatar, this.param)
      .subscribe(() => {
        this.service.showSuccessNotify('Change avatar group success!', 'Success');
        setTimeout(() =>{ location.reload();}, 500)
      }, err => this.service.showErrorNotify('Cannot upload avatar ', null)
      );
  }

  validateImageSize(file) {
    if (file.size > CONFIG.maxSizeImg) {
      this.service.showErrorNotify(
        null,
        'File is too big! Please upload file less than 1MB'
      );
      return false;
    } else {
      this.uploadForm.patchValue({
        avatar: file
      });
      return true;
    }
  }

  handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.DriversLicenseString = base64result;
  }
}
