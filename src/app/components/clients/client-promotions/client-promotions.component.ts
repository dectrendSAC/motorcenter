import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  enlargeImage(i){

  }

}
