import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { LocalStorageKeyEnum } from '@core/enums';
import { AccessTokenInterface, LoginInterface, TokenInterface, UserInfoInterface } from '@core/interfaces';

import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$: BehaviorSubject<boolean>;

  private _userInfo$ = new BehaviorSubject<UserInfoInterface | null>(null);

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

  public get userInfo$(): Observable<UserInfoInterface | null> {
    return this._userInfo$.asObservable();
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  public constructor(
    private readonly _authApiService: AuthApiService,
    private readonly _router: Router
  ) {
    this._isLoggedIn$ = new BehaviorSubject<boolean>(this._accessToken != null);
  }

  public login(userCredentials: LoginInterface): Observable<TokenInterface> {
    return this._authApiService.login(userCredentials).pipe(
      map((tokens: TokenInterface): TokenInterface => {
        this._accessToken = tokens.access;
        this._refreshToken = tokens.refresh;
        this._isLoggedIn$.next(true);

        return tokens;
      })
    );
  }

  public logout(): void {
    this._userInfo$.next(null);
    this._accessToken = null;
    this._refreshToken = null;
    this._isLoggedIn$.next(false);

    this._router.navigateByUrl('sign-in');
  }

  public getUserInfo(): void {
    this._authApiService.getUserInfo().subscribe((userInfo: UserInfoInterface): void => {
      this._userInfo$.next(userInfo);
    });
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
