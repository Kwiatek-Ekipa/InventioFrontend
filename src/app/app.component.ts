import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private _sub = new Subscription();

  public ngOnInit(): void {
    const isLoggedInSubscription = this._authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn && !this._authService.userInfo$.getValue()) {
        this._authService.fetchUserInfo().subscribe();
      }
    });

    this._sub.add(isLoggedInSubscription);
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
