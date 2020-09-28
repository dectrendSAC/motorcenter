import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  clientQuotes = [
    {vehicleName: 'Hyundai Atos', vehicleVersion:'sedan', vehicleColorCode:'#212121', vehicleColorName:'Negro', vehiclePrice:50000, vehicleInitialPrice:50000, executive: 'asdasdasd' },
    {vehicleName: 'Hyundai Atos', vehicleVersion:'sedan', vehicleColorCode:'#212121', vehicleColorName:'Negro', vehiclePrice:50000, vehicleInitialPrice:50000, executive: 'asdasdasd' },
    {vehicleName: 'Hyundai Atos', vehicleVersion:'sedan', vehicleColorCode:'#212121', vehicleColorName:'Negro', vehiclePrice:50000, vehicleInitialPrice:50000, executive: 'asdasdasd' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
