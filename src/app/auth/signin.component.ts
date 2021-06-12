import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbAuthService } from './fb-auth.service';
// import { AngularFireDatabase } from '@angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // designs: AngularFireList<any>;
  // designs : AngularFirestoreCollection
  currentUser : string;
  designs: any;
  


  // test = {
  //   name: 'Alliuy',
  //   number: 2
  // }
  constructor(private auth : FbAuthService, private router : Router, private db: AngularFireDatabase, private afs: AngularFirestore) {
    // this.designs = db.list('designs');
    
   }

  ngOnInit() {
 
    this.currentUser = localStorage.getItem('userId')    
    if(this.currentUser != null || this.currentUser != undefined){
      this.router.navigateByUrl('/canvas')
    }else{
      this.router.navigateByUrl('');
    }
    
  }

  login(){
    this.auth.singinWithGoogle()
    .then(res => {
      this.currentUser = res.user.uid;
      localStorage.setItem('userId', JSON.stringify(this.currentUser))
      this.router.navigateByUrl('/canvas')
      console.log('res', res)
    }
    );
    
  }

  // updateUser(){
  //   // let o = this.currentUser;
  //   this.afs.collection('designs').add(this.test)
  //   // this.afs
  //   // this.designs.update(`userrrrId/${this.currentUser}`,{o:o})
  //   console.log('ggggg');
    
  // }

  checkUers(){
    this.auth.checkUserState()
    .then(res => console.log(res,'state'));
    
  }

  
}
