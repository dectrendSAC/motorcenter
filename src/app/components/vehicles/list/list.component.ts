import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayLeft: boolean = false;
  displayRight: boolean = true;

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
        },
        onTranslated: (e) => {
          if (e.relatedTarget.current() === 0) {
            this.displayLeft = false;
          } else {
            this.displayLeft = true;
          }

          if (e.relatedTarget.current() === e.relatedTarget.maximum()) {
            this.displayLeft = true;
            this.displayRight = false;
          } else {
            this.displayRight = true;
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
