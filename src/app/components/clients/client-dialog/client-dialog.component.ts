import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  records = [];
  recordDates= [];
  step = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientDialogComponent>) { }

  ngOnInit(): void {
    moment.locale('es');

    if (this.data.format == 'accordion'){
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

}
