import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchDeviceType } from '@core/types';
import { CreateDeviceInterface, DeviceInterface, UpdateDeviceInterface } from '@core/models/device.interface';
import { AbstractApiService } from './abstract-api.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceApiService extends AbstractApiService {
  public constructor() {
    super('devices');
  }

  public searchDevices(searchParameters?: SearchDeviceType): Observable<DeviceInterface[]> {
    if (!searchParameters) return this.$get('');

    let params = new HttpParams();

    if (searchParameters.model) {
      params = params.append('model', searchParameters.model);
    }

    if (searchParameters.serialNumber) {
      params = params.append('serialNumber', searchParameters.serialNumber);
    }

    if (searchParameters.yearOfProductionGte) {
      params = params.append('year_of_production__gte', searchParameters.yearOfProductionGte);
    }

    if (searchParameters.yearOfProductionLte) {
      params = params.append('year_of_production__lte', searchParameters.yearOfProductionLte);
    }

    if (searchParameters.brandId) {
      searchParameters.brandId.forEach((brand) => {
        params = params.append('brandId', brand);
      });
    }

    if (searchParameters.categoryId) {
      searchParameters.categoryId.forEach((category) => {
        params = params.append('categoryId', category);
      });
    }

    return this.$get('', params);
  }

  public getDevice(id: string): Observable<DeviceInterface> {
    return this.$get(`${id}`);
  }

  public createDevice(brand: CreateDeviceInterface): Observable<DeviceInterface> {
    return this.$post('', brand);
  }

  public updateDevice(brand: UpdateDeviceInterface): Observable<DeviceInterface> {
    return this.$put(`${brand.id}`, brand);
  }

  public deleteDevice(id: string): Observable<void> {
    return this.$delete(`${id}`);
  }
}
