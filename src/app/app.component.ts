import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fabric } from 'fabric';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canvas-app';
  constructor(private router : Router) { }

  ngOnInit() {
    let userState = localStorage.getItem('user')    
    if(userState != null || userState != undefined){
      this.router.navigateByUrl('/canvas')
    }else{
      this.router.navigateByUrl('');
    }
    console.log('loooo');

  }
  
}
