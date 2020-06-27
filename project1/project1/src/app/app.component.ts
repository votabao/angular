import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color;
  title = 'project1 hello my name';
  num: number= 9542.14554;
  tabIndex = 1;
  onChangeTickets(e) {
    this.tabIndex = e.target.value;
  }

  countChangedHandler(count: number) {
    console.log(count);
  }
}
