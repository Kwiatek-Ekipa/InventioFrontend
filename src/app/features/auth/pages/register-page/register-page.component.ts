import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';

import { AuthApiService } from '@core/services';
import { UILabelComponent } from '@ui';
import { CardComponent } from '@features/auth/components';
import { passwordMatchValidator } from '@features/auth/validators';

const passwordLength = 8;
const passwordPattern = new RegExp(
  `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]{${passwordLength},}$`
);

@Component({
  selector: 'auth-register',
  imports: [UILabelComponent, InputText, Password, ReactiveFormsModule, Button, CardComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  public form: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(passwordLength),
        Validators.pattern(passwordPattern),
      ]),
      passwordConfirmation: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator }
  );

  private _authApiService = inject(AuthApiService);
  private _router = inject(Router);

  public handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this._authApiService.register(this.form.value).subscribe(() => {
      this._router.navigate(['/sign-in']);
    });
  }
}
