import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../../../core/models/group';
import { GroupService } from '../../../../core/services/group.service';

@Component({
  selector: 'app-important-document',
  templateUrl: './important-document.component.html',
  styleUrls: ['./important-document.component.styl']
})
export class ImportantDocumentComponent implements OnInit {
  @Input() groupId;
  group: Group;
  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.groupService.getGroup(this.groupId).subscribe((group: Group) => {
      this.group = group;
    });
  }

}
