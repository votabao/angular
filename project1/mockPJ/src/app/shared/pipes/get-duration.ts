import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CustomeDuration' })
export class CustomeDuration implements PipeTransform {
  transform(value: any): any {
    const hour = Math.floor(value / 60).toString();
    const minutes = value % 60;
    return hour + 'h' + ' : ' + minutes + 'm';
  }
}
