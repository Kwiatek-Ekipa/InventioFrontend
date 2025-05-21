import { Injectable } from '@angular/core';
import { AbstractApiService } from './abstract-api.service';
import { Observable } from 'rxjs';
import { HardwareBrandInterface } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class HardwareBrandApiService extends AbstractApiService {
  public constructor() {
    super('brands');
  }

  public searchBrands(name: string): Observable<HardwareBrandInterface[]> {
    return this.$get('', { name });
  }

  public getBrand(id: string): Observable<HardwareBrandInterface> {
    return this.$get(`${id}`);
  }

  public createBrand(brand: HardwareBrandInterface): Observable<HardwareBrandInterface> {
    return this.$post('', brand);
  }

  public updateBrand(brand: HardwareBrandInterface): Observable<HardwareBrandInterface> {
    return this.$put(`${brand.id}`, brand);
  }

  public deleteBrand(id: string): Observable<void> {
    return this.$delete(`${id}`);
  }
}
