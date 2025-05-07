import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { UILabelComponent } from '@ui';
import { BackgroundComponent } from '../../components/background/background.component';
import { CardComponent } from '@features/auth/components/card/card.component';

@Component({
  selector: 'auth-login',
  imports: [BackgroundComponent, UILabelComponent, InputText, Password, ReactiveFormsModule, Button, CardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public form: FormGroup = new FormGroup(
    {
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    },
    { updateOn: 'blur' }
  );

  public handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    //TODO: connect with api when api is ready
  }
}
