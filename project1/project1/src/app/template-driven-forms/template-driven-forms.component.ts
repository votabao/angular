import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { contact } from '../modal/event-modal'

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.css']
})


export class TemplateDrivenFormsComponent implements OnInit {
  @ViewChild('contactForm') contactForm: NgForm;
 
  countryList: country[] = [
    new country("1", "India"),
    new country('2', 'USA'),
    new country('3', 'England')
  ];
 
  contact: contact;
  constructor() { }
  
  ngOnInit(): void {
    
    this.contact = {
      firstname: "Sachin",
      lastname: "Tendulkar",
      email: "sachin@gmail.com",
      gender: "male",
      isMarried: true,
      country: "2",
      address: { city: "Mumbai", street: "Perry Cross Rd", pincode: "400050" }
    };

    setTimeout(() => { 
      this.contactForm.setValue(this.contact);
    });
  }

  submit(){
    console.log(this.contact);
  }

  // changeCountry() {
  //   this.contact.country = "1";
  // }

  changeCountry() {
    this.contactForm.controls["country"].setValue("1");
 }  // use viewchild
  

  // reset(contactForm :NgForm) {
  //   contactForm.resetForm();
  // }

  reset() {
    this.contactForm.reset();
  }

  resetForm() {
    this.contactForm.resetForm();
 }
 
  patchValue() {
    let obj = {
      firstname: "Rahul",
      lastname: "Dravid",
      email: "rahul@gmail.com",
    };
 
    this.contactForm.control.patchValue(obj);
 
  }

  changeAddress() {
    let obj = {
      city: "Bangalore",
      street: "Brigade Road",
      pincode: "600100"
    };
    let address= this.contactForm.controls["address"] as FormGroup
    address.patchValue(obj);
 
  }


  setDefaults() {
    this.contact = {
      firstname: "Sachin",
      lastname: "Tendulkar",
      email: "sachin@gmail.com",
      gender: "male",
      isMarried: true,
      country: "2",
      address: { city: "Mumbai", street: "Perry Cross Rd", pincode: "400050" }
    };
  }
}

export class country {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}
