import { Injectable } from '@angular/core';
import { AbstractApiService } from './abstract-api.service';
import { Observable } from 'rxjs';
import { DeviceInterface } from '@core/models/device.interface';
import { SearchDeviceType } from '@core/types';

@Injectable({
  providedIn: 'root',
})
export class DeviceApiService extends AbstractApiService {
  public constructor() {
    super('devices');
  }

  public searchDevices(searchParameters?: SearchDeviceType): Observable<DeviceInterface[]> {
    return this.$get('', searchParameters);
  }

  public getDevice(id: string): Observable<DeviceInterface> {
    return this.$get(`${id}`);
  }

  public createDevice(brand: DeviceInterface): Observable<DeviceInterface> {
    return this.$post('', brand);
  }

  public updateDevice(brand: DeviceInterface): Observable<DeviceInterface> {
    return this.$put(`${brand.id}`, brand);
  }

  public deleteDevice(id: string): Observable<void> {
    return this.$delete(`${id}`);
  }
}
