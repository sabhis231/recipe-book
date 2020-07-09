import { User } from './../../../shared/model/user.model';
import { Action } from '@ngrx/store';

export const AUTO_LOGIN = 'AUTO_LOGIN';
export const AUTO_LOGIN_FAIL = 'AUTO_LOGIN_FAIL';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_DONE = 'LOGIN_DONE';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AutoLoginFail implements Action {
    readonly type = AUTO_LOGIN_FAIL;
  }

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class LoginDone implements Action {
  readonly type = LOGIN_DONE;
  constructor(public payload: User) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActionsType = LoginDone | Logout | LoginStart | LoginFail;
