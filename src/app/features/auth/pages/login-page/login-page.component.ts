import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { UILabelComponent } from '@ui';
import { BackgroundComponent } from '../../components/background/background.component';

@Component({
  selector: 'auth-login',
  imports: [BackgroundComponent, Card, UILabelComponent, InputText, Password, ReactiveFormsModule, Button],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public form: FormGroup = new FormGroup(
    {
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    },
    { updateOn: 'submit' }
  );

  public handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    //TODO: connect with api when api is ready
  }
}
