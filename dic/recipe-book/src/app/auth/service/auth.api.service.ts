import { User } from './../../shared/model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as environment from '../../../environments/environment';
import { signInApi, signUpApi } from './../../../assets/static.link';

@Injectable({ providedIn: 'root' })
export class AuthAPIService {
  constructor(private http: HttpClient) {}

  authKey: string = environment.environment.authKey;

  signUpApi: string = signUpApi + this.authKey;
  signInApi: string = signInApi + this.authKey;

  doAuth(email: string, password: string) {
    if (this.authKey) console.log("Please enter Valid Firebase Auth key");
    return this.http.post<User>(this.signInApi, {
      email: email,
      password: password,
    });
  }
}
