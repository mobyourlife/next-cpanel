import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import '../style/app.scss';

@Component({
  selector: 'mob-app',
  directives: [...ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() { }
}
