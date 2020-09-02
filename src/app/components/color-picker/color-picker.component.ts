import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  colorHex: string[];
  colorName: string;
  topPosition: number;

  @Input() color: string;
  @Input() position: { top: number; left: number; };
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() event: EventEmitter<string> = new EventEmitter<string>();

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

  constructor() { }

  ngOnInit(): void {
    var colorHex = [];
    this.defaultColors.forEach(element => {
      colorHex.push(element.hex)
    });
    this.colorHex = colorHex;

    this.topPosition = this.position.top - 235;
  }

  closePicker(){
    this.close.emit(true);
  }

   /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    var index = this.defaultColors.findIndex(x => x.hex === color);
    this.color = color;
    this.colorName = this.defaultColors[index].name;
    this.event.emit(this.colorName);
    this.close.emit(true);
  }

}
