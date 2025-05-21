import { Injectable } from '@angular/core';
import { AbstractApiService } from './abstract-api.service';
import { Observable } from 'rxjs';
import { HardwareCategoryInterface } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class HardwareCategoryApiService extends AbstractApiService {
  public constructor() {
    super('categories');
  }

  public searchCategories(name: string): Observable<HardwareCategoryInterface> {
    return this.$get('', { name });
  }

  public getCategoryDetails(id: string): Observable<HardwareCategoryInterface> {
    return this.$get(`${id}`);
  }

  public createCategory(category: HardwareCategoryInterface): Observable<HardwareCategoryInterface> {
    return this.$post('', category);
  }

  public updateCategory(category: HardwareCategoryInterface): Observable<HardwareCategoryInterface> {
    return this.$post(`${category.id}`, category);
  }

  public deleteCategory(id: string): Observable<void> {
    return this.$delete(`${id}`);
  }
}
