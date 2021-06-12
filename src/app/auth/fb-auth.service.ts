import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import auth from 'firebase/app';
// import * as firebase from 'firebase/app';
// import { User } from  'firebase';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FbAuthService {

  // userData: Observable<firebase.User>;
  constructor(private afAuth : AngularFireAuth) { }

  singinWithGoogle(){
    let provider = new auth.auth.GoogleAuthProvider() 
    // let provider = new auth.auth.GoogleAuthProvider_Instance() 
    return this.afAuth.signInWithPopup(provider)
  }

  signOut(){
    return this.afAuth.signOut()
  }

  checkUserState(){
    return this.afAuth.currentUser;
  }
}
