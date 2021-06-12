import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FbAuthService } from './fb-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isLoggedIn : boolean;
  constructor(private auth:FbAuthService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userState()
  }

  userState(){
    return this.auth.checkUserState()
    .then( res =>{
      console.log(res);
      
      if(res == null){
        this.router.navigateByUrl('')
        return false;
      }else{
        return true;
      }
    })
    .catch(err =>{
      console.log('error', err);
      return false;
    })
  }
  
}
