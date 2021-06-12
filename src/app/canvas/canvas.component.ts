import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { fabric } from 'fabric';
import { Observable } from 'rxjs';
import { FbAuthService } from '../auth/fb-auth.service';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  canvas: any;
  colorValue: string;
  brushWidth: number = 1;
  drawingMode: string = "OFF";
  width = '100%';
  currentUser: string;
  designs$: AngularFirestoreDocument<any>;
  designItems: Observable<any>;
  savedData: any;
  notifier: boolean;


  // this.canvas.freeDrawingBrush.color = this.colorValue

  constructor( private auth : FbAuthService, private router: Router, private afs: AngularFirestore) { 
   
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem('userId')    
    this.designs$ =  this.afs.doc(`designs/${this.currentUser}`)
    console.log(this.currentUser);
    
    this.designItems = this.designs$.valueChanges()
    // console.log('this', this.elementRef.nativeElement.parentElement.clientWidth);
    // this.designs =  this.afs.collection.doc(this.currentUser)
    this.designs$.get().subscribe( data =>{
      this.savedData = data.data().data;
       this.canvas.loadFromJSON(data.data().data)
    
    }
    
    )
    
    this.canvas = new fabric.Canvas('canvasEl', {
      isDrawingMode: true,
      width:900,
      height:700,
    })
    
    // this.getDrawnData(this.currentUser)
    // this.canvas.freeDrawingBrush.color = this.colorValue
    setInterval(()=>{
      this.saveDrawing()
    }, 30000)
  }
  fileUploaded(event){
    let file = event.target.files[0];
    this.readUploadedFile(file)
  }

  private readUploadedFile (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result as string, img =>{
        this.canvas.add(img)
      })
    })
  }

  changeColor() {
    // console.log('event',   this.colorValue);
    this.canvas.freeDrawingBrush.color = this.colorValue;
    // console.log('color', color);
    
  }
  changeBrushWidth(){
    this.canvas.freeDrawingBrush.width = this.brushWidth
  }

  async getDrawnData(){
   let _data =  await this.afs.collection('designs').doc(this.currentUser).get()
   console.log(_data);
    // this.canvas.loadFromDatalessJSON(data)
    // console.log('cliiiicked');
  }

  saveDrawing(){
    const dataJson = JSON.stringify(this.canvas.toDatalessJSON()) 
    if(this.savedData == dataJson){
      return
    }else{
      this.displayNotifier()
      this.savedData = dataJson;
      this.afs.collection('designs').doc(this.currentUser).set({
        data: dataJson
      })      
    }

  }

  displayNotifier() {
    this.notifier = true;
    setTimeout(() => {
      this.notifier = false;
    }, 4000);
  }

  changeDrawingMode(){
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    if(this.canvas.isDrawingMode){
      this.drawingMode = "OFF";
    }else{
      this.drawingMode = "ON";
    }
  }
  logOut(){
    this.auth.signOut()
    localStorage.removeItem('userId')
    this.router.navigateByUrl('')
  }




}
