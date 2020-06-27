import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CustomeStatus' })
export class CustomeStatus implements PipeTransform {
  transform(value: boolean): string {
    if (!value) {
      return 'Learning';
    } else {
      return 'Done';
    }
  }
}
