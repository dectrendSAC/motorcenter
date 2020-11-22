import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare let $: any;

@Component({
  selector: 'app-client-promotion-dialog',
  templateUrl: './client-promotion-dialog.component.html',
  styleUrls: ['./client-promotion-dialog.component.scss']
})
export class ClientPromotionDialogComponent implements OnInit {
  displayLeft: boolean = false;
  displayRight: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientPromotionDialogComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    var owl = $('#promsList');

    owl.on('changed.owl.carousel',(e) => {
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
    })

    owl.owlCarousel({
        loop:false,
        margin:50,
        nav:false,
        dots:false,
        animateOut: 'fadeOut',
        startPosition: this.data.selectedImage,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
  }

  //Owl carousel Navigator
  navLeft(){
    $('#promsList').trigger('prev.owl.carousel');
  }

  navRight(){
    $('#promsList').trigger('next.owl.carousel');
  }

}
