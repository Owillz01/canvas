import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { SigninComponent } from './auth/signin.component';
import { CanvasComponent } from './canvas/canvas.component';


const routes: Routes = [
  {path: '', component: SigninComponent},
  // {path:'canvas', component: CanvasComponent},
  {path:'canvas', component: CanvasComponent, canActivate: [AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [AuthGuardGuard]
})
export class AppRoutingModule { }
