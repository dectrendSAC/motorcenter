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

  @Input() color: string;
  @Input() position: { top: number; left: number; };
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() colorData = new EventEmitter<{event: string, extra: string}>();

  public defaultColors = [
    {"hex": "#ffffff", "name": "Blanco"},
    {"hex": "#808080", "name": "Gris"},
    {"hex": "#C0C0C0", "name": "Plateado"},
    {"hex": "#000000", "name": "Negro"},
    {"hex": "#4682b4", "name": "Azul metalico"},
    {"hex": "#cd2626", "name": "Rojo"},
    {"hex": "#2e8b57", "name": "Verde"},
    {"hex": "#ff7f00", "name": "Naranja"},
    {"hex": "#cd7f32", "name": "Bronce"},
    {"hex": "#ffd700", "name": "Amarillo"}
  ];

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    var colorHex = [];
    this.defaultColors.forEach(element => {
      colorHex.push(element.hex)
    });
    this.colorHex = colorHex;
  }

  ngAfterViewInit() {
    let height = document.getElementById('colorPicker').getBoundingClientRect().height
    this.topPosition = this.position.top - (height + 30);

    this.colorIndex = this.colorHex.findIndex(x => x === this.color);
    this.colorName = this.defaultColors[this.colorIndex].name;
    console.log(this.colorIndex)

    this.cdRef.detectChanges();
  }

  closePicker(){
    this.close.emit(true);
  }

  changeColorName(code:string){
    if(code.length > 0){
      let index = this.defaultColors.findIndex(x => x.hex === code);
      this.colorName = this.defaultColors[index].name;
    } else {
      console.log('desde aqui')
    }
  }

   /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    let index = this.defaultColors.findIndex(x => x.hex === color);
    this.colorName = this.defaultColors[index].name;
    this.colorCode = this.defaultColors[index].hex;
    this.colorData.emit({event: this.colorName, extra: this.colorCode});
    this.close.emit(true);
  }

}
