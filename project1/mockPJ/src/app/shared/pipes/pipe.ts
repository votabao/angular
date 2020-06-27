import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CustomeTime' })
export class CustomePipe implements PipeTransform {
  transform(value: any): string {
    if (value.hour < 10 && value.hour.toString().length < 2 ) {
      value.hour = '0' + value.hour
    }
    if (value.minute < 10  && value.minute.toString().length < 2) {
      value.minute = '0' + value.minute
    }
    return value.hour + ':' + ' ' + value.minute;
  }
}

@Pipe({ name: 'CustomeDuration' })
export class CustomeDuration implements PipeTransform {
  transform(value: any): string {
    if (value.hour < 10 && value.hour.toString().length < 2) {
      value.hour = '0' + value.hour
    }
    if (value.minute < 10 && value.minute.toString().length < 2) {
      value.minute = '0' + value.minute
    }
    return value.hour + 'h' + ':' + ' ' + value.minute + 'm';
  }
}

@Pipe({ name: 'CustomeDate' })
export class CustomeDate implements PipeTransform {
  transform(value: any): string {
    const date = new Date(value)
    return date.toDateString();
  }
}

// test
