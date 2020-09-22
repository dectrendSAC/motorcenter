import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

@Component({
  selector: 'app-client-notifications',
  templateUrl: './client-notifications.component.html',
  styleUrls: ['./client-notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ClientNotificationsComponent implements OnInit {
  notifications = [];
  allchecked = [];
  notifyFilterIcon: string = '';
  notifyFilterText: string = 'FILTRO';
  showReadBtn: boolean = false;
  showUnreadBtn: boolean = false;
  showDeleteBtn: boolean = false;

  @ViewChild('menuTrigger') trigger:any;
  @ViewChild('allCheckbox') private allCheckbox: MatCheckbox;

  clientNotifications = [
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'read', favorite:true},
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Se realizaron los trabajos de planchado y pintura por un costo de S/580', date:'20/05/2020 18:43', status:'unread', favorite:true},
    {tittle: 'Ya puede recoger su vehículo de placa 456-YT8', content:'Escena el oh el cuenta cruzar. Cogio la negra ukase mucho llamo bajos si. Gozaba era dia una delito decida. Comenzaba recordaba se gentilica despierta izquierda sensibles es.', date:'20/05/2020 18:43', status:'unread', favorite:false}
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.notifications = this.clientNotifications;
  }

  //select all checkboxes method
  toggleAll(event:boolean) {
    let checkstatus = [];
    this.allchecked = [];
    if ( event ) {
       this.notifications.forEach(row => {
          this.allchecked.push(row)
        });
        this.allchecked.forEach((row) => {
          row.status == 'read' ? checkstatus.push('read') : checkstatus.push('unread');
        });
        if(checkstatus.every( (val) => val === 'read' ) ){
          this.showReadBtn = false;
          this.showUnreadBtn = true;
        } else if (checkstatus.every( (val) => val === 'unread' )){
          this.showUnreadBtn = false;
          this.showReadBtn = true;
        } else {
          this.showUnreadBtn = true;
          this.showReadBtn = true;
        }
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
    return this.allchecked.indexOf(item) > -1;
  };

  //Show only read notifications
  showOnlyRead(){
    this.notifyFilterIcon = 'mark_email_read';
    this.notifyFilterText = 'LEIDOS';
    this.notifications = this.clientNotifications.filter(function( obj ) {
      return obj.status !== 'unread';
    });
    this.allCheckbox.checked ? this.toggleAll(true) : null;
  }

  //Show only unread notifications
  showOnlyUnread(){
    this.notifyFilterIcon = 'mark_email_unread';
    this.notifyFilterText = 'NO LEIDOS';
    this.notifications = this.clientNotifications.filter(function( obj ) {
      return obj.status !== 'read';
    });
    this.allCheckbox.checked ? this.toggleAll(true) : null;
  }

  //Show only favorites notifications
  showOnlyFavorites(){
    this.notifyFilterIcon = 'bookmark';
    this.notifyFilterText = 'MARCADOS';
    this.notifications = this.clientNotifications.filter(function( obj ) {
      return obj.favorite !== false && obj.status !== 'read';
    });
    this.allCheckbox.checked ? this.toggleAll(true) : null;
  }

  //Show all notifications
  showAll(){
    if( this.notifyFilterText != 'FILTRO' ){
      this.notifyFilterIcon = '';
      this.notifyFilterText = 'FILTRO';
      this.trigger.closeMenu();
    }
    this.notifications = this.clientNotifications;
    this.allCheckbox.checked ? this.toggleAll(true) : null;
  }

  //Show buttons according to notify status
  ShowActionBtn(index:number, event:MatCheckboxChange){
    if (event.checked){
      if ( this.notifications[index].status == 'read' ) {
        this.showUnreadBtn = true;
      } else {
        this.showReadBtn = true;
      }
      this.showDeleteBtn = true;
      if(this.allchecked.findIndex(x => x.id==index) === -1){
        this.allchecked.push({'id': index, 'status': this.clientNotifications[index].status});
      }
    } else {
      let checkstatus = [];
      this.allchecked = this.allchecked.filter( obj => obj.id !== index);
      if (this.allchecked.length >= 1){
        this.allchecked.forEach((row) => {
          row.status == 'read' ? checkstatus.push('read') : checkstatus.push('unread');
        });
        if(checkstatus.every( (val) => val === 'read' ) ){
          this.showReadBtn = false;
          this.showUnreadBtn = true;
        } else if (checkstatus.every( (val) => val === 'unread' )){
          this.showUnreadBtn = false;
          this.showReadBtn = true;
        }
      } else {
        this.showReadBtn = false;
        this.showUnreadBtn = false;
        this.showDeleteBtn = false;
      }
    }
  }

  //open dialog with notification message
  showNotification(index:number){
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: this.notifications[index].tittle, format:'simple', content: this.notifications[index].content, info: false}
    });

    dialogRef.afterClosed().subscribe( result => {
        this.notifications[index].status = 'read'
    });
  }
}
