import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-client-bottomsheet',
  templateUrl: './client-bottomsheet.component.html',
  styleUrls: ['./client-bottomsheet.component.scss']
})
export class ClientBottomsheetComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<ClientBottomsheetComponent>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this._bottomSheetRef.dismiss({data:false});
    }, 3500);
  }

  execAction(event: MouseEvent): void {
    this._bottomSheetRef.dismiss({data:true});
    event.preventDefault();
  }

}
