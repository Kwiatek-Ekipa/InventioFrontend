import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';

import { UILabelComponent } from '@ui';
import { AuthService } from '@core/services';
import { LoginInterface } from '@core/interfaces';
import { CardComponent } from '@features/auth/components';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'auth-login',
  imports: [UILabelComponent, InputText, Password, ReactiveFormsModule, Button, CardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public isLoading = false;
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _route = inject(ActivatedRoute);

  public handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const userCredentials = this.form.value as LoginInterface;

    this.isLoading = true;
    //TODO: add error handling when toaster is implemented.
    this._authService
      .login(userCredentials)
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        const redirectUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

        this._router.navigateByUrl(redirectUrl);
      });
  }
}
