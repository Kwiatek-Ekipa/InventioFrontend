import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component} from '@angular/core';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {UILabelComponent} from '@ui/label/label.component';
import {BackgroundComponent} from '../../components/background/background.component';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const passwordConfirmation = control.get('passwordConfirmation')?.value;

  if (password !== passwordConfirmation) {
    return { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'auth-login',
  imports: [
    BackgroundComponent,
    Card,
    UILabelComponent,
    InputText,
    Password,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {

  public form: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required)
  }, { validators: passwordMatchValidator });


  public handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    //TODO: connect with api when api is ready
  }
}

