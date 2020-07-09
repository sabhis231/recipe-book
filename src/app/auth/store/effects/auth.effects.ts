import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../shared/model/user.model';
import { AuthAPIService } from './../../service/auth.api.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as authAction from '../actions/auth.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

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
          map((userData: User) => {
            console.log(userData);
            localStorage.setItem('recipe-userData', JSON.stringify(userData));
            return new authAction.LoginDone(userData);
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
      if (!localData)
      return new authAction.AutoLoginFail();

      let loadUser: {
        emailId: string;
        _idToken: string;
        refreshToken: string;
        localId: string;
      } = JSON.parse(localData);
      const user = new User(
        loadUser.emailId,
        loadUser._idToken,
        loadUser.refreshToken,
        loadUser.localId
      );
      
      return new authAction.LoginDone(user);
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.action$.pipe(
    ofType(authAction.LOGIN_DONE),
    tap(() => {
      console.log('loginn effect');
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl ? returnUrl : '/']);
    })
  );

  @Effect({ dispatch: false })
  logout = this.action$.pipe(
    ofType(authAction.LOGOUT),
    tap(() => {
      localStorage.removeItem('recipe-userData');
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
