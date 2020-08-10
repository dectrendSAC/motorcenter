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
  title = 'frontend';

  prepareRoute(outlet: RouterOutlet) {
    /*if(outlet.isActivated){
      if(outlet.activatedRoute.firstChild){
        return outlet && outlet.activatedRoute.snapshot.firstChild.data['animation'];
      } else {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
      }
    }*/
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
