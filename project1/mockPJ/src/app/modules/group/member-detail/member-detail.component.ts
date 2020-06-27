import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.styl']
})
export class MemberDetailComponent implements OnInit {
  memberID;
  constructor(
   private route: ActivatedRoute
  ) { }

  ngOnInit() {
   this.route.paramMap.subscribe(params => {
     this.memberID = params.get('memberID');
   });
  }

}
