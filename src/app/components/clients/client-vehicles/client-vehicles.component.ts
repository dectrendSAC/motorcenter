import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

let count = 0, color;

@Component({
  selector: 'app-client-vehicles',
  templateUrl: './client-vehicles.component.html',
  styleUrls: ['./client-vehicles.component.scss']
})
export class ClientVehiclesComponent implements OnInit {
  VehicleFormGroup: FormGroup;
  vehicleName: string = 'Random Vehicle brand and model';
  vehicleType: string = 'moto';
  vehicleRelation: string  = 'Propietario';
  vehiclePlate: string = 'A5T-3RD';
  vehicleVIN: string = 'LJCPCBLCX11000237';
  verhicleYear: number = 2000;
  vehicleColor: string = 'Negro';
  showColorPalette: boolean = false;
  colorPickerPosition: any;
  vehicleDetails: any;
  colorHex: string = '#212121';
  displaySaveBtn: boolean = false;
  formVehicleButton: string = 'edit';
  enableReadonly: boolean = true;

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {
    //Form validators
    this.VehicleFormGroup = this._formBuilder.group({
      kmFormControl: [{value: 15000, disabled: false}, [Validators.required]],
      colorFormControl: [{value: this.vehicleColor, disabled: false}, [Validators.required]]
    });

    //Detect form inputs changes
    this.VehicleFormGroup.valueChanges
    .subscribe(() =>
    {
      var formValues = JSON.parse(sessionStorage.getItem("VehicleForm"));

      var formGroup = {};
      Object.keys(this.VehicleFormGroup.controls).forEach(key => {
        formGroup[key] = this.VehicleFormGroup.controls[key].value
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

  ngOnInit(): void {
    //Vehicle details variables
    this.vehicleDetails = { type: this.vehicleType, color: this.colorHex };

    switch (this.vehicleType) {
      case 'moto':
          alert("Selected Case Number is 1");
          break;
      case 'camioneta':
          alert("Selected Case Number is 2");
          break;
      default:
    }
  }

  //Enable vehicle form fields editing
  enableEditing(){
    if (count == 0){
      let items = {'kmFormControl':this.VehicleFormGroup.controls['kmFormControl'].value, 'colorFormControl':this.VehicleFormGroup.controls['colorFormControl'].value};
      sessionStorage.setItem("VehicleForm", JSON.stringify(items));
      color = this.colorHex;
    }
    this.enableReadonly = false;
    count = count+1;

    if(document.getElementById('saveIconBtn')){
      const dialogRef = this.dialog.open(ClientDialogComponent, {
        data: {tittle: '¿Seguro que desea deshacer los cambios?', content: 'Todos los cambios se perderán'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.data){
          var formValues = JSON.parse(sessionStorage.getItem("VehicleForm"));
          this.VehicleFormGroup.controls['kmFormControl'].setValue(formValues.kmFormControl);
          this.VehicleFormGroup.controls['colorFormControl'].setValue(formValues.colorFormControl);
          sessionStorage.removeItem("VehicleForm");
          this.colorHex = color;
          this.vehicleDetails = { type: this.vehicleType, color: this.colorHex };
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
  }

  //Save vehicle info
  saveEditedVehicle(){

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
  openColorPicker(){
    this.showColorPalette = true;
    let viewportOffset = document.getElementById('colorPickerInput').getBoundingClientRect();
    const { top, left } = viewportOffset;
    this.colorPickerPosition = { top: top, left: left };
  }

  //Set vehicle and input color
  setColor($event: any){
    this.VehicleFormGroup.controls['colorFormControl'].setValue($event.event);
    this.colorHex = $event.extra;
    this.vehicleDetails = { type: this.vehicleType, color: this.colorHex };
  }

  //Close color picker
  closeColorPicker(status:boolean){
    this.showColorPalette = !status;
  }

}
