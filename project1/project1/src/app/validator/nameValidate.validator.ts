import { Directive, Input } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  FormControl
} from "@angular/forms";

@Directive({
  selector: "[nameMacth][ngModel]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: NameValidator, multi: true }
  ]
})
export class NameValidator implements Validator {
  name = 'baovota'
  validate(c: FormControl) {
    let isValid = c.value === this.name;

    if (isValid) {
      return null;
    } else {
      return {
        nameMacth: {
          valid: true
        }
      };
    }
  }
}
