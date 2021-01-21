import { Component, OnInit } from '@angular/core';
import { multipleAnimations } from '../../animations';
import { RouterExtService } from 'src/app/services/previous-url.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/pass-data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [
    multipleAnimations.routeTrigger,
    multipleAnimations.fadeOneTrigger,
    multipleAnimations.fadeTwoTrigger,
    multipleAnimations.slideThreeTrigger,
    multipleAnimations.slideOneTrigger,
    multipleAnimations.slideTwoTrigger
  ]
})
export class ClientsComponent implements OnInit {
  changeItemDescriptionStatus:boolean;
  showDistinctTopImage: boolean = false;
  displayClient: boolean = true;
  displayTop: boolean = false;
  displaySidebar:boolean = false;
  displayToolbar:boolean = false;
  displayContent:boolean = false;
  previousUrl: string;

  constructor(private routerExtService: RouterExtService, private router: Router, private data: DataService) { }

  ngOnInit(): void {
    //Check if workshop screen is visible
    if (this.router.url.indexOf('/taller') > -1) {
      this.showDistinctTopImage = true;
    } else {
      this.showDistinctTopImage = false;
    }

    this.previousUrl = this.routerExtService.getPreviousUrl();
    //Animation sequence
    if(this.previousUrl = '/'){
      this.displayTop = true;
      setTimeout(() => { this.displaySidebar = true }, 1600);
      setTimeout(() => { this.displayToolbar = true }, 2200);
      setTimeout(() => { this.displayContent = true }, 2500);
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
    console.log('omanight')
    this.data.goToMainStatus(status);
    this.data.awaitAnimationOnScroll(status);
    setTimeout(() => { this.displaySidebar = false }, 1700);
    setTimeout(() => { this.displayToolbar = false }, 1700);
    setTimeout(() => { this.displayContent = false }, 1700);
    /*setTimeout(() => { this.displayClient = false }, 2500);*/
    setTimeout(() => { this.data.goToMainStatus(false); this.data.awaitAnimationOnScroll(false); }, 500);
  }

}
