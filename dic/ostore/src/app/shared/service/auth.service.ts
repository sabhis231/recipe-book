import { switchMap } from 'rxjs/operators';
import { User } from 'shared/model/User.model';
import { Subscription, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { of, empty } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public userObh$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private dbFire: AngularFireDatabase
    ) { 
    this.userObh$=afAuth.authState;
  }
  

   doLogin() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  doLogout() {
    this.afAuth.auth.signOut();
  }

  doSaveUpdateUser(userData: firebase.User) {
    this.dbFire.object('/users/'+ userData.uid).update({
      name:userData.displayName,
      email: userData.email
    });
  }

  fetchUserFromDB(userId: string): AngularFireObject<User> {
    return this.dbFire.object('/users/'+ userId);
  }

  getUserdata(){
    return this.userObh$.pipe(
      switchMap(user => {
        if(user) 
          return this.fetchUserFromDB(user.uid).valueChanges();
        else 
          return of(null);
    }));
  }

}
