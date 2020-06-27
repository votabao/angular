import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-attribute-directives',
  templateUrl: './custom-attribute-directives.component.html',
  styleUrls: ['./custom-attribute-directives.component.css']
})
export class CustomAttributeDirectivesComponent implements OnInit {
  color;
  constructor() { }
  
  ngOnInit(): void {
  }

}
