import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable } from 'rxjs';

import { LocalStorageKeyEnum } from '@core/enums';
import { LoginInterface, TokenInterface, UserInfoInterface } from '@core/interfaces';

import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isLoggedIn$: BehaviorSubject<boolean>;

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

  public constructor(
    private readonly _authApiService: AuthApiService,
    private readonly _router: Router
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(this._accessToken != null);
    this.getUserInfo();
  }

  public login(userCredentials: LoginInterface): Observable<TokenInterface> {
    return this._authApiService.login(userCredentials).pipe(
      first(),
      map((tokens: TokenInterface): TokenInterface => {
        this._accessToken = tokens.access;
        this._refreshToken = tokens.refresh;

        this.isLoggedIn$.next(true);
        this.getUserInfo();

        return tokens;
      })
    );
  }

  public logout(): void {
    this._userInfo$.next(null);
    this._accessToken = null;
    this._refreshToken = null;
    this.isLoggedIn$.next(false);

    this._router.navigateByUrl('sign-in');
  }

  public getUserInfo(): void {
    this._authApiService
      .getUserInfo()
      .pipe(first())
      .subscribe((userInfo: UserInfoInterface): void => {
        this._userInfo$.next(userInfo);
      });
  }

  public refresh(): Observable<string> {
    return this._authApiService.refresh(this.refreshToken as string).pipe(
      first(),
      map(({ access }): string => {
        this._accessToken = access;

        return access;
      })
    );
  }
}
