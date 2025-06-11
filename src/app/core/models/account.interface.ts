import { RoleInterface } from './role.interface';

export interface SimpleAccountInterface {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export interface AccountInterface extends SimpleAccountInterface {
  role: RoleInterface;
}
