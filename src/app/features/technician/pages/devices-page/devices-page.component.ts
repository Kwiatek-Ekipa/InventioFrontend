import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { BrandsComponent } from '@features/technician/containers/devices/brands/brands.component';
import { CategoriesComponent } from '@features/technician/containers/devices/categories/categories.component';

@Component({
  selector: 'technician-devices-page',
  imports: [Card, BrandsComponent, CategoriesComponent],
  templateUrl: './devices-page.component.html',
  styleUrl: './devices-page.component.scss',
})
export class DevicesPageComponent {}
