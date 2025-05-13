export interface AccessTokenInterface {
  access: string;
}

export interface TokenInterface extends AccessTokenInterface {
  refresh: string;
}
