import { HardwareBrandInterface } from './hardware-brand.interface';
import { HardwareCategoryInterface } from './hardware-category.interface';
import { SimpleAccountInterface } from './account.interface';

export interface DeviceInterface {
  id: string;
  model: string;
  brand: HardwareBrandInterface;
  category: HardwareCategoryInterface;
  yearOfProduction: number;
  serialNumber: string;
  addedDate: Date;
  addedBy: SimpleAccountInterface;
}

export interface CreateDeviceInterface {
  model: string;
  brandId: string;
  categoryId: string;
  yearOfProduction: number;
  serialNumber: string;
  addedDate?: Date;
}

export interface UpdateDeviceInterface extends CreateDeviceInterface {
  id: string;
}
