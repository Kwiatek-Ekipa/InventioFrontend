import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { LocalStorageKeyEnum } from '@core/enums';
import { AccessTokenInterface, LoginInterface, TokenInterface, UserInfoInterface } from '@core/interfaces';

import { AuthApiService } from '@core/services/api-services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean>;

  public userInfo$ = new BehaviorSubject<UserInfoInterface | null>(null);

  private set _accessToken(token: string | null) {
    if (!token) localStorage.removeItem(LocalStorageKeyEnum.ACCESS_TOKEN);
    else localStorage.setItem(LocalStorageKeyEnum.ACCESS_TOKEN, token);
  }

  public get accessToken(): string | null {
    return localStorage.getItem(LocalStorageKeyEnum.ACCESS_TOKEN);
  }

  private set _refreshToken(token: string | null) {
    if (!token) localStorage.removeItem(LocalStorageKeyEnum.REFRESH_TOKEN);
    else localStorage.setItem(LocalStorageKeyEnum.REFRESH_TOKEN, token);
  }

  public get refreshToken(): string | null {
    return localStorage.getItem(LocalStorageKeyEnum.REFRESH_TOKEN);
  }

  public constructor(
    private readonly _authApiService: AuthApiService,
    private readonly _router: Router
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(this.accessToken != null);
  }

  public login(userCredentials: LoginInterface): Observable<TokenInterface> {
    return this._authApiService.login(userCredentials).pipe(
      map((tokens: TokenInterface): TokenInterface => {
        this._accessToken = tokens.access;
        this._refreshToken = tokens.refresh;
        this.isLoggedIn$.next(true);

        return tokens;
      })
    );
  }

  public logout(): void {
    this._accessToken = null;
    this._refreshToken = null;
    this.isLoggedIn$.next(false);
    this.userInfo$.next(null);

    this._router.navigateByUrl('sign-in');
  }

  public fetchUserInfo(): Observable<UserInfoInterface> {
    return this._authApiService.getUserInfo().pipe(
      tap((userInfo: UserInfoInterface): void => {
        this.userInfo$.next(userInfo);
      })
    );
  }

  public refresh(): Observable<AccessTokenInterface> {
    return this._authApiService.refresh(this.refreshToken as string).pipe(
      map((token: AccessTokenInterface): AccessTokenInterface => {
        this._accessToken = token.access;

        return token;
      })
    );
  }
}
