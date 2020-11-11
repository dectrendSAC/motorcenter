import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

let count = 0, color: string, index:number, canceledQuotes = [];

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  QuoteFormGroup: FormGroup;
  controlArray: FormArray;
  cancelQuoteIndexArray: any;
  vehicleIndex: number;
  displaySaveBtn: boolean = false;
  formVehicleButton: string = 'edit';
  showColorPalette: boolean = false;
  colorDetails: any;
  colorPickerPosition: any;
  colorHex: string;
  enableReadonly: boolean = true;
  dialogContent: any;
  approvedState: number = -1;

  clientQuotes = [
    {vehicleName: 'Hyundai Atos', vehicleVersions: [{description:'basico', selected:false}, {description:'full', selected:true}], vehicleColors: [{hex:'#212121', name:'Negro', selected:true}, {hex:'#C0C0C0', name:'Plateado', selected:false}], vehiclePrice:50000, vehicleInitialPrice:50000, state: [{date:'', description:'Verificando depósito o transferencia', detail:'', status:false, done: false, disable: false, canceled: false}, {date:'', description:'', detail:'', status:false, done: false, disable: false, canceled: false}], quoteExecutive: [{name:'Luis Aponte Valdiviezo', phone:962548713, email:'laponte@mail.com'}]},
    {vehicleName: 'Hyundai Atos', vehicleVersions: [{description:'basico', selected:false}, {description:'full', selected:true}], vehicleColors: [{hex:'#212121', name:'Negro', selected:false}, {hex:'#C0C0C0', name:'Plateado', selected:true}], vehiclePrice:50000, vehicleInitialPrice:50000, state: [{date:'2020-02-12T12:47:55Z', description:'Depósito de $50000 en cuenta BCP confirmada', detail:'182341762', status:true, done: true, disable: false, canceled: false}, {date:'', description:'Trámite de placa y registro de tarjeta de propiedad', detail:'', status:false, done: false}], quoteExecutive: [{name:'Luis Aponte Valdiviezo', phone:962548713, email:'laponte@mail.com'}]},
    {vehicleName: 'Hyundai Atos', vehicleVersions: [{description:'basico', selected:false}, {description:'full', selected:true}], vehicleColors: [{hex:'#212121', name:'Negro', selected:true}, {hex:'#C0C0C0', name:'Plateado', selected:false}], vehiclePrice:50000, vehicleInitialPrice:50000, state: [{date:'', description:'Verificando depósito o transferencia', detail:'', status:false, done: false, disable: true, canceled: false}, {date:'', description:'', detail:'', status:false, done: false, disable: true, canceled: false}], quoteExecutive: [{name:'Luis Aponte Valdiviezo', phone:962548713, email:'laponte@mail.com'}]},
    {vehicleName: 'Hyundai Atos', vehicleVersions: [{description:'basico', selected:false}, {description:'full', selected:true}], vehicleColors: [{hex:'#212121', name:'Negro', selected:true}, {hex:'#C0C0C0', name:'Plateado', selected:false}], vehiclePrice:50000, vehicleInitialPrice:50000, state: [{date:'', description:'Verificando depósito o transferencia', detail:'', status:false, done: false, disable: false, canceled: true}, {date:'', description:'', detail:'', status:false, done: false, disable: false, canceled: true}], quoteExecutive: [{name:'Luis Aponte Valdiviezo', phone:962548713, email:'laponte@mail.com'}]}
  ];

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {
    //Form array
    this.QuoteFormGroup = new FormGroup({
      formArrayName: this._formBuilder.array([])
    })

    this.buildForm();

    //Detect form inputs changes
    merge(...this.controlArray.controls.map((control: AbstractControl, index: number) =>
        control.valueChanges.pipe(map(value => ({ rowIndex: index, value })))))
      .subscribe(changes => {
        var formValues = JSON.parse(sessionStorage.getItem("VehicleForm"));

        var formGroup = {};
        Object.keys(this.controlArray.controls[changes.rowIndex].value).forEach(key => {
          formGroup[key] = this.controlArray.controls[changes.rowIndex].get(key).value
        })

        if (formValues){
          if(JSON.stringify(formGroup) === JSON.stringify(formValues)){
            this.displaySaveBtn = false;
            this.formVehicleButton = 'undo';
          } else {
            this.formVehicleButton = 'restore';
            this.displaySaveBtn = true;
          }
        }
      });
  }

  buildForm(){
    this.controlArray = this.QuoteFormGroup.get('formArrayName') as FormArray;

    Object.keys(this.clientQuotes).forEach((i) => {
      let colorname: string;
      Object.keys(this.clientQuotes[i].vehicleColors).forEach(obj => {
        if (this.clientQuotes[i].vehicleColors[obj].selected) {colorname = this.clientQuotes[i].vehicleColors[obj].name}
      });

      this.controlArray.push(
        this._formBuilder.group({
          versionFormControl: [{value: 'default', disabled: true}, [Validators.required]],
          colorFormControl: [{value: colorname, disabled: false}, [Validators.required]]
        })
      )
    })
  }


  ngOnInit(): void {
    //Check if quote is canceled
    this.clientQuotes.forEach((item, index) => {
      if(item.state[0].canceled){
        if(canceledQuotes.indexOf(index) === -1) {
          canceledQuotes.push(index);
          sessionStorage.setItem("CanceledQutes", JSON.stringify(canceledQuotes));
        }

        this.cancelQuoteIndexArray = JSON.parse(sessionStorage.getItem("CanceledQutes"));
        console.log(this.cancelQuoteIndexArray);

      }
    })
  }

  //Enable vehicle form fields editing
  enableEditing(i:any){

    if (count == 0){
      let items = {'versionFormControl':this.controlArray.controls[i].get('versionFormControl').value, 'colorFormControl':this.controlArray.controls[i].get('colorFormControl').value};
      sessionStorage.setItem("VehicleForm", JSON.stringify(items));
      Object.keys(this.clientQuotes[i].vehicleColors).forEach(obj => {
        if (this.clientQuotes[i].vehicleColors[obj].selected) {this.colorHex = this.clientQuotes[i].vehicleColors[obj].hex}
      });
      color = this.colorHex;
      index = i;
    }

    this.controlArray.controls[i].get('versionFormControl').enable();

    if(index === i) {
      this.vehicleIndex = i;
      this.enableReadonly = false;
      count = count+1;

      if(document.getElementById('saveIconBtn-'+i)){
        const dialogRef = this.dialog.open(ClientDialogComponent, {
          data: {tittle: '¿Seguro que desea deshacer los cambios?', format:'simple', content: 'Todos los cambios se perderán'}
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result.data){
            var formValues = JSON.parse(sessionStorage.getItem("VehicleForm"));
            this.controlArray.controls[i].get('versionFormControl').setValue(formValues.versionFormControl);
            this.controlArray.controls[i].get('colorFormControl').setValue(formValues.colorFormControl);
            sessionStorage.removeItem("VehicleForm");
            this.colorHex = color;
            this.enableReadonly = true;
            this.displaySaveBtn = false;
            this.formVehicleButton = 'edit';
            count = 0;
          } else {
            this.formVehicleButton = 'restore';
          }
        });
      } else {
        this.formVehicleButton = 'undo';
        if(count > 1){
          sessionStorage.removeItem("VehicleForm");
          this.enableReadonly = true;
          this.displaySaveBtn = false;
          this.formVehicleButton = 'edit';
          count = 0;
        }
      }
    }else{
      count = 0;
      var formValues = JSON.parse(sessionStorage.getItem("VehicleForm"));
      this.controlArray.controls[index].get('versionFormControl').setValue(formValues.versionFormControl);
      this.controlArray.controls[index].get('colorFormControl').setValue(formValues.colorFormControl);
      sessionStorage.removeItem("VehicleForm");
      this.displaySaveBtn = false;
      this.enableEditing(i);
    }
  }

  //Save vehicle info
  saveEditedQuote(i: any){
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: '¿Seguro que desea guardar los cambios?', format:'simple', content: 'Esta decisión no se puede modificar luego'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.data){
        sessionStorage.removeItem("VehicleForm");
        this.enableReadonly = true;
        this.displaySaveBtn = false;
        this.formVehicleButton = 'edit';
        count = 0;
      }
    });
  }

  //Color picker methods
  openColorPicker(i: any){
    if(!this.enableReadonly){
      this.vehicleIndex = i;
      this.showColorPalette = true;
      let viewportOffset = document.getElementById('colorPickerInput-'+i).getBoundingClientRect();
      const { top, left } = viewportOffset;
      this.colorPickerPosition = { top: top, left: left };
      this.colorDetails = { name: this.controlArray.controls[i].get('colorFormControl').value, hex: this.colorHex, options: this.clientQuotes[i].vehicleColors };
    }
  }

  //Set vehicle and input color
  setColor($event: any, i: any){
    this.controlArray.controls[i].get('colorFormControl').setValue($event.event);
    this.colorHex = $event.extra;
  }

  //Close color picker
  closeColorPicker(status:boolean){
    this.showColorPalette = !status;
  }

  //Show seller information
  sellerInfo(i: any){
    this.dialogContent = this.clientQuotes[i].quoteExecutive

    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: 'Información de contacto', format:'accordion2', content: this.dialogContent}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      }
    });
  }

  //show price information
  priceInfo(){
    this.dialog.open(ClientDialogComponent, {
      data: {tittle: '', description:'precio', format:'simple', content: ['Separa tu vehículo con un inicial o la totalidad del precio sin intereses', 'Recuerda que ofrecemos las mejores opciones de financiamiento según tu perfil', ' NO OLVIDE CONTACTAR A SU EJECUTIVO DE VENTAS'], info: true}
    });
  }

  //Show quote status
  displayQuoteStatus(i: any){
    this.dialog.open(ClientDialogComponent, {
      data: {tittle: 'Seguimiento del vehículo', description:'estado', format:'stepper', content: this.clientQuotes[i].state, info: true}
    });
  }

  //Cancel and disable quote
  cancelQuote(i:any){
    if(canceledQuotes.indexOf(i) === -1) {
      canceledQuotes.push(i);
      sessionStorage.setItem("CanceledQutes", JSON.stringify(canceledQuotes));
    }

    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: '¿Seguro que desea cancelar la cotización?', format:'simple', content: 'Esta acción es irreversible, todos el proceso será anulado'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data){
        this.cancelQuoteIndexArray = JSON.parse(sessionStorage.getItem("CanceledQutes"));
      }
    });
  }

  //pay proccess of a quote
  payQuote(i:any){
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: ['Nuestros métodos de pago','Confirma la transferencia o depósito','Verificación en proceso'], format:'accordion3', content: [this.clientQuotes[i].vehicleInitialPrice,'MC-1025','3.623']}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data){
        this.approvedState = i;
      }
    });
  }
}
