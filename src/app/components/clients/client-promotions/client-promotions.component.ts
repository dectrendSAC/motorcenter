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
    let promImages = [];
    this.clientPromotions.forEach(proms => {
      promImages.push(proms.promImage)
    });

    this.dialog.open(ClientPromotionDialogComponent, {
      data: {selectedImage: i, images: promImages},
      panelClass: 'imgProm',
      backdropClass: 'backdropProm'
    });
  }
}
