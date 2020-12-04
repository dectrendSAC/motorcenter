import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/pass-data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  changeItemDescriptionStatus:boolean;
  showDistinctTopImage: boolean = false;
  displayToolbar:boolean = true;

  constructor(private router: Router, private data: DataService) { }

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

  //Main methods
  goToMain(status:boolean){
    this.data.goToMainStatus(status);
    this.data.awaitAnimationOnScroll(status);
    setTimeout(() => { this.displayToolbar = false }, 1700);
    /*setTimeout(() => { this.displaySideScroll = false }, 1700);
    setTimeout(() => { this.displaySections = false }, 2600);*/
    setTimeout(() => { this.data.goToMainStatus(false); this.data.awaitAnimationOnScroll(false); }, 500);
  }

}
