import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@core/services';
import { first, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private _authService: AuthService = inject(AuthService);
  private _router = inject(Router);

  public canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this._authService.userInfo$.pipe(
      first(),
      switchMap((user) => {
        if (!user && this._authService.isLoggedIn$.getValue()) {
          return this._authService.fetchUserInfo();
        }

        return of(user);
      }),
      map((user) => {
        if (!user) {
          this._router.navigate(['/sign-in']);

          return false;
        }

        if (state.url === '/') {
          this._router.navigate(['/' + user.role]);

          return false;
        }

        if (!state.url.includes(user.role)) {
          this._router.navigate(['/' + user.role]);

          return false;
        }

        return true;
      })
    );
  }
}
