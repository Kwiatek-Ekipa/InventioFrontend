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

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const isLoggedIn = this._authService.isLoggedIn$.getValue();

    if (isLoggedIn) {
      this._router.navigate(['/']);

      return false;
    }

    return true;
  }
}
