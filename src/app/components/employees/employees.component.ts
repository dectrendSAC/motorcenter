import { Component, OnInit } from '@angular/core';
import { multipleAnimations } from '../../animations';
import { RouterExtService } from 'src/app/services/previous-url.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/pass-data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    multipleAnimations.routeTrigger,
    multipleAnimations.fadeOneTrigger,
    multipleAnimations.fadeTwoTrigger,
    multipleAnimations.slideThreeTrigger,
    multipleAnimations.slideOneTrigger,
    multipleAnimations.slideTwoTrigger
  ]
})
export class EmployeesComponent implements OnInit {
  changeItemDescriptionStatus:boolean;
  showDistinctTopImage: boolean = false;
  displayTop: boolean = false;
  displaySidebar:boolean = false;
  displayToolbar:boolean = false;
  displayContent:boolean = true;
  displayItem: boolean = false;
  previousUrl: string;
  showItemsByRol: string;

  constructor(private routerExtService: RouterExtService, private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.displayTop = true;
    this.showItemsByRol = window.history.state.rol;

    //Check if workshop screen is visible
    if (this.router.url.indexOf('/taller') > -1) {
      this.showDistinctTopImage = true;
    } else {
      this.showDistinctTopImage = false;
    }

    this.previousUrl = this.routerExtService.getPreviousUrl();
    //Animation sequence
    if(this.previousUrl = '/'){
      setTimeout(() => { this.displaySidebar = true }, 600);
      setTimeout(() => { this.displayToolbar = true }, 1700);
      setTimeout(() => { this.displayItem = true }, 2000);
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
    setTimeout(() => { this.displayItem = false }, 1500);
    setTimeout(() => { this.displayToolbar = false }, 1700);
    setTimeout(() => { this.displaySidebar = false }, 2000);
    setTimeout(() => { this.displayTop = false }, 2800);
    setTimeout(() => { this.data.goToMainStatus(false); }, 500);
  }

}
