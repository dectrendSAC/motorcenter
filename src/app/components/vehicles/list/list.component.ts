import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayLogin:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    $('#vehiclesList').owlCarousel({
        loop:true,
        margin:50,
        nav:false,
        navText: [$('.am-next'),$('.am-prev')],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    })
  }
  
  navLeft(){
    $('#vehiclesList').trigger('prev.owl.carousel');
  }

  navRight(){
    $('#vehiclesList').trigger('next.owl.carousel');
  }

  showMore(){
    this.displayLogin = true;
  }

}
