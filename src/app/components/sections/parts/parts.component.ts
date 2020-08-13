import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/pass-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { 

    //Await animation sequence
    this.data.goToMainStatusCurrentData.subscribe(data3 => {
      if(data3){
        setTimeout(() => { this.router.navigateByUrl('/'); }, 2800);
      }
    });
  }

  ngOnInit(): void {
  }

}
