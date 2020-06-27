import { Component, OnInit } from '@angular/core';

import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { JoinedGroups } from '../../../../core/models/joined-groups';
import { LoginService } from '../../../../core/services/login.service';
import { GroupService } from '../../../../core/services/group.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  user: any;
  groups: JoinedGroups[];

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private groupService: GroupService,
    private router: Router,
    private service: CommonService
  ) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
    this.getAllGroupsService();
  }

  signIn(platform: string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(platform).then(user => {
      if (user.email.includes('@ntq-solution.com.vn')) {
        this.loginService
          .getToken({ email: user.email, idToken: user.idToken })
          .subscribe(
            response => {
              this.loginService.showSuccess();
              setTimeout(() => {
                location.reload();
              }, 500)
              localStorage.setItem('token', response.body.token);
              this.user = user;
              localStorage.setItem('user', JSON.stringify(user));
            },
            () => {
              this.signOut();
            }
          );
      } else {
        this.loginService.showError();
      }
    });
  }

  signOut() {
    this.loginService.signOut();   
  }

  getAllGroupsService(): void {
    this.groupService.getJoinedGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  onSelect(id) {
    this.router.navigate([`/group/${id}/content`]).then(() => location.reload());
  }
}