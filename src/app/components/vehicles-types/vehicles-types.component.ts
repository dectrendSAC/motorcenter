import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicles-types',
  templateUrl: './vehicles-types.component.svg',
  styleUrls: ['./vehicles-types.component.scss']
})
export class VehiclesTypesComponent implements OnInit {

  @Input() vehicleDetails: { type: string; color: string; };

  constructor() { }

  ngOnInit(): void {
  }

}
