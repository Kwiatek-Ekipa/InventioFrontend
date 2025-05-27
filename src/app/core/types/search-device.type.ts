export type SearchDeviceOrderingType =
  | 'year_of_production'
  | '-year_of_production'
  | 'model'
  | '-model'
  | 'added_date'
  | '-added_date';

export type SearchDeviceType = {
  brandId?: string[];
  categoryId?: string[];
  model?: string;
  serialNumber?: string;
  yearOfProductionGte?: number;
  yearOfProductionLte?: number;
  ordering?: SearchDeviceOrderingType;
};
