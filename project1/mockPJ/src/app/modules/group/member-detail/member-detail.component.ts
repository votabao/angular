import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../core/models/member';
import { CONFIG } from '../../../shared/config';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.styl']
})
export class MemberDetailComponent implements OnInit {
  dateFormat = CONFIG.dateFormat;
  memberID;
  member: Member;
  constructor(
   private route: ActivatedRoute,
   private memberService: MemberService
  ) { }

  ngOnInit() {
   this.route.paramMap.subscribe(params => {
     this.memberID = params.get('memberID');
     this.memberService.getMemberByID(this.memberID).subscribe((member: Member) => {
       this.member = member;
     });
   });
  }
}
