export type SearchDeviceOrderingType =
  | 'year_of_production'
  | '-year_of_production'
  | 'model'
  | '-model'
  | 'added_date'
  | '-added_date';

export type SearchDeviceType = {
  brand_id?: string[];
  category_id?: string[];
  model?: string;
  serial_number?: string;
  year_of_production__gte?: number;
  year_of_production__lte?: number;
  ordering?: SearchDeviceOrderingType;
};
