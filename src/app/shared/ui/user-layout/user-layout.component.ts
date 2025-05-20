import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@core/services';
import { UserRoleEnum } from '@core/enums';
import { UserInfoInterface } from '@core/interfaces';
import { SideNavComponent } from '@ui';
import { technicianNavigationItems } from '@features/technician/constants';
import { workerNavigationItems } from '@features/worker/constants';

@Component({
  selector: 'ui-user-layout',
  imports: [SideNavComponent, AsyncPipe, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {
  public navigationItems: MenuItem[] = [];
  public userInfo$: BehaviorSubject<UserInfoInterface | null> = new BehaviorSubject<UserInfoInterface | null>(null);

  public constructor(private _authService: AuthService) {
    this.userInfo$ = this._authService.userInfo$;
    const user = this._authService.userInfo$.getValue();

    switch (user?.role) {
      case UserRoleEnum.TECHNICIAN:
        this.navigationItems = technicianNavigationItems;
        break;
      case UserRoleEnum.WORKER:
        this.navigationItems = workerNavigationItems;
        break;
      default:
        this.navigationItems = [];
        break;
    }
  }

  public handleLogout(): void {
    this._authService.logout();
  }
}
