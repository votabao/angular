import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Content } from '../../../core/models/content';
import { ContentService } from 'src/app/core/services/content.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.styl']
})
export class ContentComponent implements OnInit {
  contents: Content[] = [];
  bindingContent = '';
  active = 1;
  modalRef: NgbModalRef;
  viewAllActive = false;

  constructor(
    private modalService: NgbModal,
    private contentService: ContentService,
    private router: ActivatedRoute,
    private service: CommonService
  ) { }

  ngOnInit() {
    this.getContents();
  }

  getContents(): void {
    this.contentService.getContents().subscribe(contents => {
      this.contents = contents;
    },
      error => {
        this.service.showErrorNotify(`Error, ${error.statusText}`, 'Fail!');
      });
  }

  createNewContent(title: string, content: string, startDate: any, endDate: any, level: string) {
    const newContent = new Content;
    newContent.title = title;
    newContent.content = content;
    newContent.startDate = startDate;
    newContent.endDate = endDate;
    newContent.level = level;
    this.contentService.addContent(newContent).subscribe((contents: any) => {
      this.contents.push(contents);
      this.service.showSuccessNotify(`${newContent.title} was created`, 'Success!');
      this.getContents();
    },
      error => {
        this.service.showErrorNotify(`Error ${error.statusText}`, 'Fail!');
      });
  }

}

