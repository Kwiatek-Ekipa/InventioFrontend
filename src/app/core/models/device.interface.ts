import { HardwareBrandInterface } from '@core/models/hardware-brand.interface';
import { HardwareCategoryInterface } from '@core/models/hardware-category.interface';

export interface DeviceInterface {
  id?: string;
  model: string;
  brand: HardwareBrandInterface;
  category: HardwareCategoryInterface;
  yearOfProduction: number;
  serialNumber: string;
  addedDate: Date;
}
