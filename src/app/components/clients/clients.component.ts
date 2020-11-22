import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  changeItemDescriptionStatus:boolean;
  showDistinctTopImage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    //Check if workshop screen is visible
    if (this.router.url.indexOf('/taller') > -1) {
      this.showDistinctTopImage = true;
    } else {
      this.showDistinctTopImage = false;
    }
  }

  changeItemDescription(status:boolean){
    this.changeItemDescriptionStatus = status;
    setTimeout(() => { this.changeItemDescriptionStatus = !status }, 100);

    if (document.getElementById('workshopBtn').classList.contains('clicked')) {
      this.showDistinctTopImage = true;
    } else {
      this.showDistinctTopImage = false;
    }
  }

}
