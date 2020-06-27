import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toast: ToastrService,
    private config: NgbDatepickerConfig
  ) {
  }

  showSuccessNotify(message, title) {
    return this.toast.success(message, title);
  }

  showErrorNotify(message, title) {
    return this.toast.error(message, title);
  }

  getCurrentDate(): any {
    const stringDate = new Date().toISOString().substring(0, 10);
    return new Date(new Date(stringDate).toISOString());
  }

  disablePastDay() {
    const current = new Date();
    this.config.minDate = {year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()};
    this.config.outsideDays = 'hidden';
  }
}
