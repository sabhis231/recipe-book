import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

    canActivate(): Observable<boolean> {
      return this.authService.getUserdata()
        .pipe(
          map(appUser => {
            return appUser.isAdmin
          })
        );
    }
}
