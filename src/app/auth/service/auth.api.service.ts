import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as environment from '../../../environments/environment';
import { signInApi, signUpApi } from './../../../assets/static.link';

export interface AuthData {
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthAPIService {
  constructor(private http: HttpClient) {}

  authKey: string = environment.environment.authKey;

  signUpApi: string = signUpApi + this.authKey;
  signInApi: string = signInApi + this.authKey;

  doAuth(email: string, password: string) {
    if (this.authKey) console.log('Please enter Valid Firebase Auth key');
    return this.http.post<AuthData>(this.signInApi, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
