import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pending-content',
  templateUrl: './modal-pending-content.component.html',
  styleUrls: ['./modal-pending-content.component.styl']
})
export class ModalPendingContentComponent implements OnInit {
  data;
  constructor(
    private contentService: ContentService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    
  }

  viewLess() {
    this.activeModal.close();
  }

}
