import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const passwordConfirmation = control.get('passwordConfirmation')?.value;

  return password !== passwordConfirmation ? { isPasswordMismatch: true } : null;
};
