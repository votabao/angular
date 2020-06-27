import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';

import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date-component.styl']
})
export class InputDateComponent implements OnInit, OnChanges {
  @Input() placeholder = 'text';
  @Input() readOnly;
  @Input() required;
  @Input() minDate;
  @Input() maxDate;
  @Output() changeDateEvent: any = new EventEmitter();
  @Input() date;

  constructor(
    private config: NgbDatepickerConfig,
  ) {
  }

  OnInit() {
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }

  selectedDate() {
    this.changeDateEvent.emit(this.date);
  }

}
