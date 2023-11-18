import { FormControl, ValidationErrors } from '@angular/forms';

export function trimValidator(control: FormControl): ValidationErrors | null {
  if (typeof control.value === 'string' && control.value.trim() === '') {
    return { 'trimValidator': { value: control.value } };
  }
  return null;
}
