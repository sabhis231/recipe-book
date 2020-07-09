import { AuthSandbox } from './../auth/sandbox/auth.sandbox.service';
import { AuthService } from './../auth/service/auth.service';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as appReducer from '../store/reducers/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuth: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store<appReducer.AppState>,
    private authSandbox: AuthSandbox
  ) { }

  ngOnInit() {
    this.authSandbox.getUser().subscribe(userData=>{
        this.isAuth = !!userData;
    });
  }

  onLogout() {
    this.authService.onLogout();
  }

}
