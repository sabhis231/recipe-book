import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as authAction from '../actions/auth.actions';
import { User } from './../../../shared/model/user.model';
import { AuthAPIService } from './../../service/auth.api.service';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authAPIService: AuthAPIService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Effect()
  authStart = this.action$.pipe(
    ofType(authAction.LOGIN_START),
    switchMap((authData: authAction.LoginStart) => {
      return this.authAPIService
        .doAuth(authData.payload.email, authData.payload.password)
        .pipe(
          map((userData) => {
            console.log(userData);
            localStorage.setItem('recipe-userData', JSON.stringify(userData));

            const user = new User(
              userData.email,
              userData.idToken,
              userData.refreshToken,
              new Date(new Date().getTime() + userData.expiresIn),
              userData.localId
            );
            return new authAction.LoginDone(user);
          }),
          catchError((error) => {
            console.log(error);
            return this.errorHandelar(error);
          })
        );
    })
  );

  @Effect()
  autoLogin = this.action$.pipe(
    ofType(authAction.AUTO_LOGIN),
    map(() => {
      let localData = localStorage.getItem('recipe-userData');
      if (!localData) return new authAction.AutoLoginFail();

      let loadUser: {
        email: string;
        idToken: string;
        refreshToken: string;
        localId: string;
        expiresIn: string;
      } = JSON.parse(localData);
      const user = new User(
        loadUser.email,
        loadUser.idToken,
        loadUser.refreshToken,
        new Date(new Date().getTime() + loadUser.expiresIn),
        loadUser.localId
      );

      return new authAction.LoginDone(user);
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.action$.pipe(
    ofType(authAction.LOGIN_DONE),
    tap(() => {
      let lastPage = localStorage.getItem('recipe-url');
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl ? returnUrl : lastPage ? lastPage : '/']);
    })
  );

  @Effect({ dispatch: false })
  logout = this.action$.pipe(
    ofType(authAction.LOGOUT),
    tap(() => {
      localStorage.removeItem('recipe-userData');
      localStorage.removeItem('recipe-url');
      this.router.navigate(['/auth']);
    })
  );

  private errorHandelar(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown Error';
    if (!errorRes.error && !errorRes.error.error) {
      return of(new authAction.LoginFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email id is wrong';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is wrong';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Account is Locked Contact Admin';
        break;
      default:
        errorMessage = errorMessage;
    }
    return of(new authAction.LoginFail(errorMessage));
  }
}
