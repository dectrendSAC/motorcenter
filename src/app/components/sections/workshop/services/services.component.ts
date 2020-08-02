import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  selectedOptionsArray: string[];
  selectGeneral: boolean;
  selectFrenos: boolean;
  selectLlantas: boolean;
  selectEscaneo: boolean;
  selectAfinamiento: boolean;
  selectSuspension: boolean;
  selectPlanchadoypintura: boolean;
  selectAireacondicionado: boolean;
  selectSistemaelectrico: boolean;
  selectCambiodeaceite: boolean;


  @Input() selectedItems: string;
  @Output() selectedOptionsItems = new EventEmitter<string>();
  @Output() displayServices = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    //Select services at start
    const str = this.selectedItems;
    if(str){
      const array = str.split(', ');    
      array.forEach(item => this["select"+item.replace(/\s/g, "")] = true);
    }
  }

  addServices(items:any){
    this.selectedOptionsArray = items.selectedOptions.selected.map(item => item.value);
    this.selectedOptionsItems.emit(this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", "));
    this.displayServices.emit(false);
  }

  hideServices(){
    this.displayServices.emit(false);
  }

}
