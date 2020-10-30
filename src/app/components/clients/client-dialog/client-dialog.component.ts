import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  simpleCarouselInterval: any;

  isLinear: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild('accordion',{static:false}) Accordion: MatAccordion;
  @ViewChildren('slide1, slide2, slide3', { read: ElementRef }) slidesElements:  QueryList<ElementRef>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientDialogComponent>, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //temporal script
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

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

    //Check if quotes screen is visible
    if(this.router.url.indexOf('/cotizaciones') > -1) {
      this.simpleCarouselInterval = setInterval(() => {
        this.simplecarousel();
      }, 4500);
    }
  }

  ngAfterViewInit() {

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
    clearInterval(this.simpleCarouselInterval);
    slideIndex = 0;
  }

  //Price carousel
  simplecarousel(){
    this.slidesElements.forEach((element)=>{
      const htmlElement = element.nativeElement as HTMLElement;
      htmlElement.style.display = 'none';
    });

    slideIndex++;
    if (slideIndex > this.slidesElements.length) {slideIndex = 1}
    this.slidesElements.forEach((element, index)=>{
      const htmlElement = element.nativeElement as HTMLElement;
      if (index == slideIndex-1){
        htmlElement.style.display = "inline-flex";
      } else {
        htmlElement.style.display = 'none';
      }
    });
  }
}
