import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AccessTokenInterface,
  LoginInterface,
  RegisterInterface,
  TokenInterface,
  UserInfoInterface,
} from '@core/interfaces';
import { AbstractApiService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends AbstractApiService {
  public constructor() {
    super('auth');
  }

  public login(userCredentials: LoginInterface): Observable<TokenInterface> {
    return this.$post('login', userCredentials);
  }

  public refresh(refreshToken: string): Observable<AccessTokenInterface> {
    return this.$post('refresh', { refresh: refreshToken });
  }

  public register(newUser: RegisterInterface): Observable<never> {
    return this.$post('register', newUser);
  }

  public getUserInfo(): Observable<UserInfoInterface> {
    return this.$get('user-info');
  }
}
