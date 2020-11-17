import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-promotion-dialog',
  templateUrl: './client-promotion-dialog.component.html',
  styleUrls: ['./client-promotion-dialog.component.scss']
})
export class ClientPromotionDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientPromotionDialogComponent>) { }

  ngOnInit(): void {
  }

}
