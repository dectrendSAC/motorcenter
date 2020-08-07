import { Component } from '@angular/core';
import { multipleAnimations } from '../app/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    multipleAnimations.routeTrigger
  ]
})
export class AppComponent {
  title = 'frontend';
}
