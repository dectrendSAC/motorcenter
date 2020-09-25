import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClientBottomsheetComponent } from '../client-bottomsheet/client-bottomsheet.component';

@Component({
  selector: 'app-client-notifications',
  templateUrl: './client-notifications.component.html',
  styleUrls: ['./client-notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ClientNotificationsComponent implements OnInit {
  noNotifications: boolean = false;
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

  constructor(private dialog: MatDialog, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    if( this.clientNotifications.length > 0) {
      this.notifications = this.clientNotifications;
    } else {
      this.noNotifications = true;
    }
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

  exists(item:any, origin: boolean) {
    if (origin){
      return this.allchecked.indexOf(item) > -1;
    } else {
      return false;
    }
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
      return obj.favorite !== false;
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
        this.allchecked.push({'id': index, 'status': this.notifications[index].status});
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

  //Put bookmark on notification
  putBookmark(index:number){
    if(this.notifications[index].favorite){
      this.notifications[index].favorite = false;
    } else {
      this.notifications[index].favorite = true;
    }
  }

  //change notification status
  changeStatus(option:string){
    this.allchecked.forEach((row, index) => {
      if ( row.status == 'read' && option == 'unread' ){
        if (row.id){
          this.notifications[row.id].status = 'unread';
        } else {
          this.notifications[index].status = 'unread';
        }
      }

      if ( row.status == 'unread' && option == 'read' ){
        if (row.id){
          this.notifications[row.id].status = 'read';
        } else {
          this.notifications[index].status = 'read';
        }
      }
    });
    this.toggleAll(false);
    this.allCheckbox.checked = false;
  }

  //Remove notification
  removeNotification(){
    let storedRows = [];
    let reverseChecked = [];
    if(this.allchecked[0].id != null){
      this.allchecked.forEach((row) => {
        reverseChecked.push(row);
        storedRows.push(this.notifications[row.id]);
      });
    } else {
      storedRows = this.allchecked;
      reverseChecked = this.allchecked;
    }

    if(this.allchecked.length != 1){
      if(this.allchecked[0].id < this.allchecked[1].id) {
        reverseChecked.reverse();
      }
    }
    console.log(reverseChecked)
    reverseChecked.forEach((row) => {
      this.notifications.splice(row.id, 1);
    });

    let sheetContent: string;
    this.allchecked.length == 1 ? sheetContent = 'Se elimino la notificaión' : sheetContent = 'Se eliminaron las notificaiones';

    const bottomSheetRef = this._bottomSheet.open(ClientBottomsheetComponent, {
      data: {content: sheetContent, button: 'DESHACER'}
    });

    this.showReadBtn = false;
    this.showUnreadBtn = false;
    this.showDeleteBtn = false;
    reverseChecked.forEach((row) => {
      this.exists(row, false);
    });
    this.allCheckbox.checked = false;

    bottomSheetRef.afterDismissed().subscribe(result => {
      if(result){
        if(result.data){
          if(this.allchecked[0].id != null){
            console.log(this.allchecked, reverseChecked, storedRows)
            this.allchecked.forEach((row, index) => {
              this.notifications.splice(row.id, 0, storedRows[index]);
            });
          } else {
            this.notifications = reverseChecked;
          }
          this.toggleAll(false);
        }
      }
    });
  }
}
