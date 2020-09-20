import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

let notifyIndex = 0;

@Component({
  selector: 'app-client-notifications',
  templateUrl: './client-notifications.component.html',
  styleUrls: ['./client-notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ClientNotificationsComponent implements OnInit {
  notifications = [];
  allchecked = [];
  showReadBtn: boolean = false;
  showUnreadBtn: boolean = false;
  showDeleteBtn: boolean = false;

  clientNotifications = [
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'read', favorite:true},
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'unread', favorite:true},
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'unread', favorite:false}
  ];

  constructor() { }

  ngOnInit(): void {
    this.notifications = this.clientNotifications;
  }

  //select all checkboxes method
  toggleAll(event: MatCheckboxChange) {
    if ( event.checked ) {
       this.clientNotifications.forEach(row => {
          this.allchecked.push(row)
        });
        this.showReadBtn = true;
        this.showUnreadBtn = true;
        this.showDeleteBtn = true;
    } else {
       this.allchecked.length = 0 ;
       this.showReadBtn = false;
       this.showUnreadBtn = false;
       this.showDeleteBtn = false;
    }
  }

  exists(item:any) {
    //Show actions buttons
    /*console.log(index)*/
    return this.allchecked.indexOf(item) > -1;
  };

  isChecked() {
    return this.allchecked.length === this.clientNotifications.length;
  };

  //Show only read notifications
  showOnlyRead(){
    this.notifications = this.clientNotifications.filter(function( obj ) {
      return obj.status !== 'unread';
    });
  }

  //Show only unread notifications
  showOnlyUnread(){
    this.notifications = this.clientNotifications.filter(function( obj ) {
      return obj.status !== 'read';
    });
  }

  //Show only favorites notifications
  showOnlyFavorites(){
    this.notifications = this.clientNotifications.filter(function( obj ) {
      return obj.favorite !== false && obj.status !== 'read';
    });
  }

  //Show all notifications
  showAll(){
    return this.notifications = this.clientNotifications;
  }

  ShowActionBtn(index:number, event:any){
    if (event.checked){
      if ( this.notifications[index].status == 'read' ) {
        this.showUnreadBtn = true;
      } else {
        this.showReadBtn = true;
      }
      if (notifyIndex == index){
        notifyIndex = index;
      }
      this.showDeleteBtn = true;
    } else {
      if (notifyIndex != index){
        this.ShowActionBtn(notifyIndex, event)
      } else {
        this.showReadBtn = false;
        this.showUnreadBtn = false;
        this.showDeleteBtn = false;
      }
    }
    console.log(notifyIndex)
  }
}
