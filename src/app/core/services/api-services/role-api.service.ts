import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleInterface } from '@core/models';
import { AbstractApiService } from './abstract-api.service';

@Injectable({
  providedIn: 'root',
})
export class RoleApiService extends AbstractApiService {
  public constructor() {
    super('roles');
  }

  public getRoles(): Observable<RoleInterface[]> {
    return this.$get('');
  }
}
