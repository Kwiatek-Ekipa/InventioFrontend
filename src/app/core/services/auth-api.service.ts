import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@core/services/base-api.service';
import { AccessTokenInterface, LoginInterface, RegisterInterface, TokenInterface } from '@core/interfaces';
import { UserInfoInterface } from '@core/interfaces/auth/user-info.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  public constructor(httpClient: HttpClient) {
    super(httpClient, 'auth');
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
