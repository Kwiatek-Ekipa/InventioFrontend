import { UserRoleEnum } from '@core/enums/user-role.enum';

export interface UserInfoInterface {
  email: string;
  name: string;
  surname: string;
  role: UserRoleEnum;
}
