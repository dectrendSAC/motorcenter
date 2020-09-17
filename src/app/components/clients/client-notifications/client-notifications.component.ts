import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-client-notifications',
  templateUrl: './client-notifications.component.html',
  styleUrls: ['./client-notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientNotificationsComponent implements OnInit {
  allchecked = [];
  showMainBtns: boolean = false;

  clientNotifications = [
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'read', favorite:true},
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'unread', favorite:true},
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'unread', favorite:false}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  //select all checkboxes method
  toggleAll(event: MatCheckboxChange) {
    if ( event.checked ) {
       this.clientNotifications.forEach(row => {
          this.allchecked.push(row)
        });
        this.showMainBtns = true;
    } else {
       this.allchecked.length = 0 ;
       this.showMainBtns = false;
    }
  }

  exists(item:any) {
    return this.allchecked.indexOf(item) > -1;
  };

  isChecked() {
    return this.allchecked.length === this.clientNotifications.length;
  };

}
