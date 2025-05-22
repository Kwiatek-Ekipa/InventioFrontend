import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { BrandsComponent } from '@features/technician/containers/devices/brands/brands.component';

@Component({
  selector: 'technician-devices-page',
  imports: [Card, BrandsComponent],
  templateUrl: './devices-page.component.html',
  styleUrl: './devices-page.component.scss',
})
export class DevicesPageComponent {}
