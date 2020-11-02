import { CdkStep, MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';


import * as _moment from 'moment';

const moment = _moment;
var slideIndex = 0;

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class ClientDialogComponent implements OnInit, AfterViewInit {
  records = [];
  recordDates = [];
  notificationSection: boolean = false;
  step: number;
  showStep: string;
  simpleCarouselInterval: any;

  BuyStatusFormGroup: FormGroup;
  stepStatus1: string = 'done';
  stepStatus2: string = 'done';
  stepStatus3: string = 'done';
  isLinear: boolean = true;
  statesIcon = [];
  statusDates = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild('accordion',{static:false}) Accordion: MatAccordion;
  @ViewChildren('slide1, slide2, slide3', { read: ElementRef }) slidesElements:  QueryList<ElementRef>;
  @ViewChild('stepper') formStepper: MatStepper;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientDialogComponent>, private router: Router, private _formBuilder: FormBuilder, private cdRef:ChangeDetectorRef) { }

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

    //Check if quotes screen is visible
    if(this.router.url.indexOf('/cotizaciones') > -1) {
      this.simpleCarouselInterval = setInterval(() => {
        this.simplecarousel();
      }, 4500);
    }

    //Format buy status
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [this.data.content[0].status ? 'verified' : '', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.data.content[1].status ? 'verified' : '', Validators.required]
    });

    if (this.data.format.indexOf('stepper') !== -1){
      //Format dates
      if (this.data.content){
        for(let i=0; i<this.data.content.length; i++){
          this.statusDates.push(moment(this.data.content[i].date).format('LL h:mm A'));
        }
      }
    }
  }

  ngAfterViewInit(){
    if (this.data.format.indexOf('stepper') !== -1){
      const steps = [0, 1, 2];
      steps.forEach(index => {
        if (this.data.content[index]){
          if(this.data.content[index].done){
            if (index == 0){ document.querySelector("body").style.cssText = "--my-var1: #1eb980"; this.stepStatus1 = 'done';}
            if (index == 1){ (<HTMLElement>document.querySelector('.secondClass')).style.cssText = "--my-var2: #1eb980"; this.stepStatus2 = 'done';}
            if (index == 2){ (<HTMLElement>document.querySelector('.firstClass')).style.cssText = "--my-var3: #1eb980"; this.stepStatus3 = 'done';}
          } else {
            if (index == 0){ document.querySelector("body").style.cssText = "--my-var1: #d32f2f"; this.stepStatus1 = 'schedule';}
            if (index == 1){ (<HTMLElement>document.querySelector('.secondClass')).style.cssText = "--my-var2: #d32f2f"; this.stepStatus2 = 'schedule';}
            if (index == 2){ (<HTMLElement>document.querySelector('.firstClass')).style.cssText = "--my-var3: #d32f2f"; this.stepStatus3 = 'schedule';}
          }
        } else {
          if (index == 0){ document.querySelector("body").style.cssText = "--my-var1: #b3b3b3"; this.stepStatus1 = 'block';}
          if (index == 1){ (<HTMLElement>document.querySelector('.secondClass')).style.cssText = "--my-var2: #b3b3b3"; this.stepStatus2 = 'block';}
          if (index == 2){ (<HTMLElement>document.querySelector('.firstClass')).style.cssText = "--my-var3: #b3b3b3"; this.stepStatus3 = 'block';}
        }
      });
      this.cdRef.detectChanges();
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
        this.dialogRef.close(true);
      },300);
    } else {
      this.dialogRef.close(true);
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

  //Set steps as interacted
  setMatStepsAsInteracted(){
    this.formStepper.steps.forEach((matStep : CdkStep, index)=>{
      if (this.data.content[index]){
        if(this.data.content[index].status){
          matStep.interacted=true;
        }
      }
    });
  }
}
