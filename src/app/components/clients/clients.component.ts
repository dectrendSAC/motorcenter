import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  changeItemDescriptionStatus:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  changeItemDescription(status:boolean){
    this.changeItemDescriptionStatus = status;
    setTimeout(() => { this.changeItemDescriptionStatus = !status }, 100);
  }

}
