import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';


import * as _moment from 'moment';

const moment = _moment;
var slideIndex = 0;

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  records = [];
  recordDates= [];
  notificationSection: boolean = false;
  step: number;
  showStep: string;

  @ViewChild('accordion',{static:false}) Accordion: MatAccordion;
  @ViewChildren('slides') private _slidesElements:  QueryList<ElementRef>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientDialogComponent>, private router: Router) { }

  ngOnInit(): void {
    moment.locale('es');
    setTimeout(()=>{
      this.step = 0;
    },250);

    if (this.data.format.indexOf('accordion') !== -1){
      this.records = this.data.content;

      //Format record dates
      if (this.data.content){
        for(let i=0; i<this.data.content.length; i++){
          this.recordDates.push(moment(this.data.content[i].date).format('LL h:mm A'));
        }
      } else {
        this.data.info = true;
      }
    }

    //Check if notification screen is visible
    if (this.router.url.indexOf('/notificaciones') > -1) {
      this.notificationSection = true;
    }
  }

  //Restore profile data
  restoreChanges(){
    this.dialogRef.close({data:true});
  }

  //Accordion methods
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  //Close dialog
  closeDialog(){
    if(this.Accordion){
      this.Accordion.closeAll();
      setTimeout(()=>{
        this.dialogRef.close();
      },300);
    } else {
      this.dialogRef.close();
    }
  }

  //Price carousel
  simplecarousel(){
    this._slidesElements.forEach((element)=>{
      const htmlElement = element.nativeElement as HTMLElement;
      htmlElement.style.display = 'none';
    });

    slideIndex++;
    if (slideIndex > this._slidesElements.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(this.simplecarousel, 2000); // Change image every 2 seconds
  }
}
