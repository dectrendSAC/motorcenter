import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-vehicles',
  templateUrl: './client-vehicles.component.html',
  styleUrls: ['./client-vehicles.component.scss']
})
export class ClientVehiclesComponent implements OnInit {
  VehicleFormGroup: FormGroup;
  vehicleName: string = 'Random vehicle name';
  vehicleRelation: string  = 'Propietario';
  vehiclePlate: string = 'A5T-3RD';
  vehicleVIN: string = 'LJCPCBLCX11000237';
  verhicleYear: number = 2000;
  displaySaveBtn: boolean = false;
  formVehicleButton: string = 'edit';

  constructor(private _formBuilder: FormBuilder) {
    //Form validators
    this.VehicleFormGroup = this._formBuilder.group({
      genderFormControl: ['', [Validators.required]],
      birthdayFormControl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  //Enable vehicle form fields editing
  enableEditing(){

  }

  //Save vehicle info
  saveEditedVehicle(){

  }

}
