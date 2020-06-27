import { AuthService } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CONFIG } from '../../shared/config';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private toast: ToastrService,
    private router: Router,
    private service: CommonService
  ) { }

  getToken(loginInfo): Observable<any> {
    return this.httpClient.post(CONFIG.tokenUrl, loginInfo);
  }

  showError() {
    this.toast.error('Your email is not allowed to access', 'Error!',
      {
        timeOut: 3000,
        progressBar: true,
        closeButton: true
      }
    );
  }
  showSuccess() {
    this.toast.success('Log in success', 'Welcome',
      {
        timeOut: 2500
      });
  }

  signOut(): void {
    this.authService.signOut().then(() => {});
    localStorage.clear();
    this.router.navigate(['/dashboard']).then(() => {
      this.service.showSuccessNotify('Logged out', 'Success!');
      setTimeout(() => {
        location.reload();
      }, 500)
    } );
  }
}
