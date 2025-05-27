import { HardwareBrandInterface } from '@core/models/hardware-brand.interface';
import { HardwareCategoryInterface } from '@core/models/hardware-category.interface';
import { UserInterface } from '@core/models/user.interface';

export interface DeviceInterface {
  id: string;
  model: string;
  brand: HardwareBrandInterface;
  category: HardwareCategoryInterface;
  yearOfProduction: number;
  serialNumber: string;
  addedDate: Date;
  addedBy: UserInterface;
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
