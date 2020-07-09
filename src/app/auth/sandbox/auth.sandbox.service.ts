import { User } from './../../shared/model/user.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as appReducer from '../../store/reducers/app.reducer';
import * as authAction from '../store/actions/auth.actions';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthSandbox {
  constructor(private store: Store<appReducer.AppState>) {}

  autoLogin() {
      this.store.dispatch(new authAction.AutoLogin());
  }

  loginStart(email: string, password: string) {
    this.store.dispatch(
      new authAction.LoginStart({ email: email, password: password })
    );
  }

  loadUser(user: User) {
    this.store.dispatch(new authAction.LoginDone(user));
  }

  logoutUser() {
    this.store.dispatch(new authAction.Logout());
  }

  getUserState() {
    return this.store.select('auth');
  }

  getUser() {
    return this.getUserState().pipe(
      map((userState) => {
        return userState.user;
      })
    );
  }

  getError() {
    return this.getUserState().pipe(
      map((userState) => {
        return userState.error;
      })
    );
  }

  getLoading() {
    return this.getUserState().pipe(
      map((userState) => {
        return userState.isLoading;
      })
    );
  }

}
