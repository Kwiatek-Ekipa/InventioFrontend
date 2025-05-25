import { Component, ViewChild } from '@angular/core';
import { BrandsComponent } from '@features/technician/containers/devices/brands/brands.component';
import { CategoriesComponent } from '@features/technician/containers/devices/categories/categories.component';
import { DevicesComponent } from '@features/technician/containers/devices/devices/devices.component';

@Component({
  selector: 'technician-devices-page',
  imports: [BrandsComponent, CategoriesComponent, DevicesComponent],
  templateUrl: './devices-page.component.html',
  styleUrl: './devices-page.component.scss',
})
export class DevicesPageComponent {
  @ViewChild('devices') public devicesComponent!: DevicesComponent;

  public refreshDevices(): void {
    this.devicesComponent.fetchData();
  }
}
