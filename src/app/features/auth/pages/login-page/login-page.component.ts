import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';

import { UILabelComponent } from '@ui';
import { AuthService } from '@core/services';
import { LoginInterface } from '@core/interfaces';
import { BackgroundComponent, CardComponent } from '@features/auth/components';

@Component({
  selector: 'auth-login',
  imports: [BackgroundComponent, UILabelComponent, InputText, Password, ReactiveFormsModule, Button, CardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  private _authService: AuthService = inject(AuthService);

  public handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const userCredentials = this.form.value as LoginInterface;

    this._authService.login(userCredentials).subscribe();
  }
}
