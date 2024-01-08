export interface UserInfo {
  jwt: string;
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  address: string;
  phone_number: string;
}

export const COOK = "cook"
export const CUSTOMER = "customer"

export type roles = typeof COOK | typeof CUSTOMER;

export interface UserRole {
  name: string;
  description: string;
  type: roles;
}

export interface UserSubs {
  id: number;
  isActive: boolean;
  starts: string;
  ends: string;
}

export interface Subscription {
  id: number;
  name: string;
  description: string;
  type: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  price: number;
  validDays: number;
}

export interface UserInitialState {
  userinfo: Partial<UserInfo>;
  loading: boolean;
  userRole: Partial<UserRole>;
  userSubs: Partial<UserSubs>;
  allSubs: Partial<Subscription[]>;
}
