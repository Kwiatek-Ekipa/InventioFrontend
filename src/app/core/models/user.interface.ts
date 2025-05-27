import { UserRoleEnum } from '@core/enums';

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: UserRoleEnum;
}
