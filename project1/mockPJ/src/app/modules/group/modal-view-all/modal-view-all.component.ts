
import { Router } from '@angular/router';
import { AvatarCoverService } from 'src/app/core/services/avatar-cover.service';
import { Component, OnInit } from '@angular/core';
import { ModalDetailContentService } from '../../../core/services/modal-detail-content.service';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '../../../core/models/content';

@Component({
  selector: 'app-modal-view-all',
  templateUrl: './modal-view-all.component.html',
  styleUrls: ['./modal-view-all.component.styl']
})
export class ModalViewAllComponent implements OnInit {
  groupId;
  bgUrl: string;
  backgroundContent = null;
  data: any = null;
  modalRef: NgbModalRef;
  selectedContent: any = {};
  content: Content[];

  constructor(
    public activeModal: NgbActiveModal,
    private modalDetailService: ModalDetailContentService,
    private avatarService: AvatarCoverService,
    private router: Router

  ) { }

  ngOnInit() {
    this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
    this.getCoverImage();
  }

  getCoverImage() {
    this.avatarService.getCoverImg(this.groupId).subscribe(bgUrl => {
      this.bgUrl = bgUrl.coverImageUrl;
      this.backgroundContent = {
        'background-image': 'linear-gradient(45deg, rgba(75, 117, 160, 0.6) 55%, rgba(45,95,93,0.7)), url(' + this.bgUrl + ')'
      };
    });
  }

  viewLess() {
    this.activeModal.dismiss();
  }
}
