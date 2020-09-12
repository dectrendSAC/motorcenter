import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

let count = 0, color: string, index:number;

@Component({
  selector: 'app-client-vehicles',
  templateUrl: './client-vehicles.component.html',
  styleUrls: ['./client-vehicles.component.scss']
})
export class ClientVehiclesComponent implements OnInit {
  VehicleFormGroup: FormGroup;
  controlArray: FormArray;
  vehicles = [];
  vehicleIndex: number;
  showColorPalette: boolean = false;
  colorDetails: any;
  colorPickerPosition: any;
  colorHex: string;
  displaySaveBtn: boolean = false;
  formVehicleButton: string = 'edit';
  enableReadonly: boolean = true;
  dialogContent: any;

  clientVehicles = [
    {name: 'Hyundai Atos', type:'sedan', relation:'Propietario', plate:'A5T-3RD', vin:'LJCPCBLCX11000237', year:2000, colorCode:'#212121', colorName:'Negro', km:15000, records: [{area: 'Comercial', description:'Compra del vehículo', date:'2020-02-12T12:47:55Z', status:true}, {area: 'Taller', description:'Mantenimiento 10000 kilometros', date:'2020-07-27T19:03:24Z', status:true}]},
    {name: 'Foton Aumark', type:'camion', relation:'Conductor', plate:'A2X-3LR', vin:'LXC6CMLCX11200237', year:2010, colorCode:'#cd2626', colorName:'Rojo', km:50000, records: [{area: 'Taller', description:'Mantenimiento 25000 kilometros', date:'2020-03-16T09:45:52Z', status:true}, {area: 'Taller', description:'Cambio de aceite', date:'', status:false}]},
    {name: 'TVS king', type:'trimovil', relation:'Propietario', plate:'L5M-12P', vin:'LJC952LCXFGA00210', year:2005, colorCode:'#87CEFA', colorName:'Celeste', km:1800}
  ];

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {
    //Form array
    this.VehicleFormGroup = new FormGroup({
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
    this.controlArray = this.VehicleFormGroup.get('formArrayName') as FormArray;

    Object.keys(this.clientVehicles).forEach((i) => {
      this.controlArray.push(
        this._formBuilder.group({
          kmFormControl: [{value: this.clientVehicles[i].km, disabled: false}, [Validators.required]],
          colorFormControl: [{value: this.clientVehicles[i].colorName, disabled: false}, [Validators.required]]
        })
      )
    })
  }

  ngOnInit(): void {
    //Array of vehicles
    for(let i=0; i<this.clientVehicles.length; i++){
      this.vehicles.push(i);
    }
  }

  //Enable vehicle form fields editing
  enableEditing(i:any){

    if (count == 0){
      let items = {'kmFormControl':this.controlArray.controls[i].get('kmFormControl').value, 'colorFormControl':this.controlArray.controls[i].get('colorFormControl').value};
      sessionStorage.setItem("VehicleForm", JSON.stringify(items));
      this.colorHex = this.clientVehicles[i].colorCode;
      color = this.colorHex;
      index = i;
    }

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
            this.controlArray.controls[i].get('kmFormControl').setValue(formValues.kmFormControl);
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
      this.controlArray.controls[index].get('kmFormControl').setValue(formValues.kmFormControl);
      this.controlArray.controls[index].get('colorFormControl').setValue(formValues.colorFormControl);
      sessionStorage.removeItem("VehicleForm");
      this.displaySaveBtn = false;
      this.enableEditing(i);
    }
  }

  //Save vehicle info
  saveEditedVehicle(i: any){
    this.vehicleIndex = i;
    let formValues = JSON.parse(sessionStorage.getItem("VehicleForm"));
    if(this.controlArray.controls[i].get('colorFormControl').value !== formValues.colorFormControl){
      this.dialogContent = 'No olvide registrar el cambio en la SUNARP para que podamos validarlo';
    } else {
      this.dialogContent = 'Esta decisión no se puede modificar luego';
    }

    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: '¿Seguro que desea guardar los cambios?', format:'simple', content: this.dialogContent}
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

  //Input permit only numbers
  onlyNumber(evt){
    // Only ASCII charactar in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
  }

  //Color picker methods
  openColorPicker(i: any){
    if(!this.enableReadonly){
      this.vehicleIndex = i;
      this.showColorPalette = true;
      let viewportOffset = document.getElementById('colorPickerInput-'+i).getBoundingClientRect();
      const { top, left } = viewportOffset;
      this.colorPickerPosition = { top: top, left: left };
      this.colorDetails = { name: this.controlArray.controls[i].get('colorFormControl').value, hex: this.colorHex };
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

  //Show vehicle records
  showRecords(i: any){
    this.dialogContent = this.clientVehicles[i].records

    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: 'Historial del vehículo', format:'accordion', content: this.dialogContent}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      }
    });
  }

  //Show km information
  moreInfo(){
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: '', description:'kilometraje', format:'simple', content: ['Mantenga actualizado el kilometraje de su vehículo', 'Puede obtener mantenimientos con descuento, Motor puntos y más', '¡QUÉ ESPERA, ACTUALICE YA!'], info: true}
    });
  }

}
