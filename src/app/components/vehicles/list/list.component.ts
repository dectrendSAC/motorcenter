import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output()
  displayMore = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    $('#vehiclesList').owlCarousel({
        loop:false,
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
  
  //Owl carousel Navigator
  navLeft(){
    $('#vehiclesList').trigger('prev.owl.carousel');
  }

  navRight(){
    $('#vehiclesList').trigger('next.owl.carousel');
  }

  //Show more component
  showMore(){
    this.displayMore.emit(true);
    console.log(this.displayMore);
  }

}
