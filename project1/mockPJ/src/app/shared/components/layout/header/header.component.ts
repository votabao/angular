import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../../../../core/services/common.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { JoinedGroups } from '../../../../core/models/joined-groups';
import { LoginService } from '../../../../core/services/login.service';
import { GroupService } from '../../../../core/services/group.service';

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
    private service: CommonService,
    private groupService: GroupService,
    private router: Router
  ) {}

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
              location.reload();
              localStorage.setItem('token', response.body.token);
              this.user = user;
              localStorage.setItem('user', JSON.stringify(user));
              this.loginService.showSuccess();
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

  signOut(): void {
    this.authService.signOut().then(() => {});
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/dashboard']).then(() => location.reload());
  }

  getAllGroupsService(): void {
    this.groupService.getJoinedGroups().subscribe(groups => {
      this.groups = groups;
    });
  }
}
