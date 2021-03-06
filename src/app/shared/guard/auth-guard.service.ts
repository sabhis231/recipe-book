import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthSandbox } from './../../auth/sandbox/auth.sandbox.service';
import { User } from './../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authSandbox: AuthSandbox) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSandbox.getUser().pipe(
      take(1),
      map((userData: User) => {
        localStorage.setItem('recipe-url', state.url);
        if (userData) {
          return !!userData;
        } else {
          return this.router.createUrlTree(['/auth'], {
            queryParams: {
              returnUrl: state.url,
            },
          });
        }
      })
    );
  }
}
