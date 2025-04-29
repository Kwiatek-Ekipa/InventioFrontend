import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const passwordConfirmation = control.get('passwordConfirmation')?.value;

  if (password !== passwordConfirmation) {
    return { passwordMismatch: true };
  }

  return null;
};
