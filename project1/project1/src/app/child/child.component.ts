import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  count = 5;
  constructor() {}
  @Output() countChanged: EventEmitter<number> = new EventEmitter();
  ngOnInit(): void {}

  increment() {
    this.count++;
    this.countChanged.emit(this.count);
  }
  decrement() {
    this.count--;
    this.countChanged.emit(this.count);
  }
}
