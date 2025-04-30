import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';

import { UILabelComponent } from '@ui/label/label.component';
import { passwordMatchValidator } from '../../validators';
import { BackgroundComponent } from '../../components/background/background.component';

@Component({
  selector: 'auth-register',
  imports: [BackgroundComponent, Card, UILabelComponent, InputText, Password, ReactiveFormsModule, Button],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  public form: FormGroup = new FormGroup(
    {
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator, updateOn: 'submit' }
  );

  public handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    //TODO: connect with api when api is ready
  }
}
