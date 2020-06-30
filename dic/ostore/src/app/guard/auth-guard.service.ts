import { AuthService } from 'shared/service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.userObh$.pipe(map(userData=>{
      if(userData) {
        return true;
      }
      this.router.navigate(['/login'], {
        queryParams:{
          returnUrl: state.url
        }
      });
      return false;
    }));

  }
}
