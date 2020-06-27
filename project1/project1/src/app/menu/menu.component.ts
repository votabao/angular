import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalService} from '../modal.service';
import '@angular/localize/init';

import {ModalEditEventComponent} from '../modal-edit-event/modal-edit-event.component';
import {ModalConfirmRemoveComponent} from '../modal-confirm-remove/modal-confirm-remove.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
  events: any;
  addForm: FormGroup;
  @ViewChild('el', {read: ElementRef}) el: ElementRef;
  @ViewChild('title', {read: ElementRef}) title: ElementRef;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder,
    private modal: ModalService,
  ) {
  }

  ngAfterViewInit(): void {  // chay hêt template mới chạy ng, nêu muốn viewchild chạy ngáy
    this.getEvent();
  }

  // addEvent() {
  //   const formData = new FormData();
  //   formData.append('title', this.addForm.get('title').value);
  //   this.service.addEvent(formData).subscribe(() => this.getEvent());
  //   this.title.nativeElement.value = '';
  // }

  setbg() {
    this.el.nativeElement.style.backgroundColor = '#afa9a9';
  }

  getEvent() {
    this.service.getEvent().subscribe(events => this.events = events);
  }

  addEvent(event) {
    this.service.addEvent(event).subscribe(() => this.getEvent());
    this.title.nativeElement.value = '';
  }

  removeCalendar(id) {
    this.service.removeEvent(id).subscribe(() => this.getEvent());
  }

  deleteEvent(id) {
    this.modal.openFormRemove(ModalConfirmRemoveComponent).result.then(data => {
      if (!data) {
        return;
      }
      this.removeCalendar(id);
    });
  }

  openFormEditEvent(id) {
    this.service.getEventById(id).subscribe(
      event => {
        this.modal.open(ModalEditEventComponent, event).result.then(data => {
          this.updateEvent(data, id);
        });
      },
      err => {
        alert('update not success!');
      }
    );
  }

  updateEvent(event, id) {
    this.service.editEvent(event, id).subscribe(() => this.getEvent());
  }
}
