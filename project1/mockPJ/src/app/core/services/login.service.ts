import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CONFIG } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private toast: ToastrService
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

}
