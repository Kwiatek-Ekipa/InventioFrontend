import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateHardwareCategoryInterface, HardwareCategoryInterface } from '@core/models';
import { AbstractApiService } from './abstract-api.service';

@Injectable({
  providedIn: 'root',
})
export class HardwareCategoryApiService extends AbstractApiService {
  public constructor() {
    super('categories');
  }

  public searchCategories(name: string): Observable<HardwareCategoryInterface[]> {
    return this.$get('', { name });
  }

  public getCategoryDetails(id: string): Observable<HardwareCategoryInterface> {
    return this.$get(`${id}`);
  }

  public createCategory(category: CreateHardwareCategoryInterface): Observable<HardwareCategoryInterface> {
    return this.$post('', category);
  }

  public updateCategory(category: HardwareCategoryInterface): Observable<HardwareCategoryInterface> {
    return this.$post(`${category.id}`, category);
  }

  public deleteCategory(id: string): Observable<void> {
    return this.$delete(`${id}`);
  }
}
