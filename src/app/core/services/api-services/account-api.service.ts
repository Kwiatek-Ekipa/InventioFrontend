import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInterface } from '@core/models';
import { AbstractApiService } from './abstract-api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService extends AbstractApiService {
  public constructor() {
    super('accounts');
  }

  public searchAccounts(query: string): Observable<AccountInterface[]> {
    return this.$get('', { q: query });
  }

  public getAccount(id: string): Observable<AccountInterface> {
    return this.$get(`${id}`);
  }

  public changeAccountRole(accountId: string, roleId: string): Observable<AccountInterface> {
    return this.$patch(`${accountId}`, { roleId });
  }
}
