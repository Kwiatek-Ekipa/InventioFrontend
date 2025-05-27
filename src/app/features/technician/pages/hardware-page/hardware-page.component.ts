import { Component, ViewChild } from '@angular/core';
import { BrandsComponent, CategoriesComponent, DevicesComponent } from '@features/technician/containers/hardware';

@Component({
  selector: 'technician-hardware-page',
  imports: [BrandsComponent, CategoriesComponent, DevicesComponent],
  templateUrl: './hardware-page.component.html',
  styleUrl: './hardware-page.component.scss',
})
export class HardwarePageComponent {
  @ViewChild('devices') public devicesComponent!: DevicesComponent;

  public refreshDevices(): void {
    this.devicesComponent.fetchData();
  }
}
