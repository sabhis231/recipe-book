import { AuthSandbox } from './../sandbox/auth.sandbox.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authSandbox: AuthSandbox) {}


  getUser() {
    return this.authSandbox.getUser();
  }

  autoLogin() {
    this.authSandbox.autoLogin();
  }

  onLogin(userName: string, password: string) {
    this.authSandbox.loginStart(userName, password);
  }

  onLogout() {
    this.authSandbox.logoutUser();
  }
}
