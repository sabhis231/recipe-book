import { AuthSandbox } from './../../auth/sandbox/auth.sandbox.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './../../auth/service/auth.service';
import { User } from './../model/user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authSandbox: AuthSandbox,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authSandbox.getUser().pipe(
      take(1),
      exhaustMap((userData: User) => {
        if (!userData) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', userData.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
