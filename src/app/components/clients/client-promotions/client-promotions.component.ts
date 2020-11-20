import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientPromotionDialogComponent } from '../client-promotion-dialog/client-promotion-dialog.component';

@Component({
  selector: 'app-client-promotions',
  templateUrl: './client-promotions.component.html',
  styleUrls: ['./client-promotions.component.scss']
})
export class ClientPromotionsComponent implements OnInit {

  clientPromotions = [
    {promTitle: 'Planchado & Pintura', promImage: 'assets/images/historia_1-min.jpg'},
    {promTitle: 'Planchado & Pintura', promImage: 'assets/images/historia_1-min.jpg'},
    {promTitle: 'Planchado & Pintura', promImage: 'assets/images/historia_1-min.jpg'}
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  enlargeImage(i:any){
    this.dialog.open(ClientPromotionDialogComponent, {
      data: {image: this.clientPromotions[i].promImage},
      panelClass: 'imgProm',
      backdropClass: 'backdropProm'
    });
  }
}
