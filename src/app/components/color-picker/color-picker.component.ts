import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  colorHex: string[];
  colorCode: string;
  colorName: string;
  colorIndex: number;
  topPosition: number;

  @Input() color: { name: string; hex: string; options: any };
  @Input() position: { top: number; left: number; };
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() colorData = new EventEmitter<{event: string, extra: string}>();

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    var colorHex = [];
    this.color.options.forEach(element => {
      colorHex.push(element.hex)
    });
    this.colorHex = colorHex;

    this.colorName = this.color.name;
  }

  ngAfterViewInit() {
    let height = document.getElementById('colorPicker').getBoundingClientRect().height
    this.topPosition = this.position.top - (height + 30);

    this.colorIndex = this.colorHex.findIndex(x => x === this.color.hex);
    if(this.colorIndex > -1){
      this.colorName = this.color.options[this.colorIndex].name;
    }

    this.colorName = this.color.name;
    this.colorIndex = this.color.options.findIndex(x => x.name === this.colorName);

    this.cdRef.detectChanges();
  }

  closePicker(){
    this.close.emit(true);
  }

  changeColorName(code:string){
     if(code.length > 0){
      let index = this.color.options.findIndex(x => x.hex === code);
      this.colorName = this.color.options[index].name;
    } else {
      this.colorName = this.color.name;
    }
  }

   /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    let index = this.color.options.findIndex(x => x.hex === color);
    this.colorIndex = index;
    this.colorName = this.color.options[index].name;
    this.colorCode = this.color.options[index].hex;
    this.colorData.emit({event: this.colorName, extra: this.colorCode});
    this.close.emit(true);
  }

}
