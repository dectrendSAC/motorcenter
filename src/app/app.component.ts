import { Component } from '@angular/core';
import { multipleAnimations } from '../app/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    multipleAnimations.routeTrigger
  ]
})
export class AppComponent {
  paddingBottom: number = 0;
  title = 'frontend';

  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated){
      if(outlet.activatedRoute.firstChild){
        if(outlet.activatedRoute.snapshot.firstChild.data['animation'] == 'Vehiculos'){
          if(window.innerWidth > 1800){
            this.paddingBottom = 10;
          } else {
            this.paddingBottom = 14;
          }
          return outlet && outlet.activatedRoute.snapshot.firstChild.data['animation'];
        } else {
          this.paddingBottom = 0;
          return outlet && outlet.activatedRoute.snapshot.firstChild.data['animation'];
        }
      } else {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
      }
    }
  }
}
