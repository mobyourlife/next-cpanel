import { Component, OnInit, NgZone } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { Page } from './page.model';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  pages: Page[];

  constructor(
    private api: ApiService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    console.log('Hello Home');
    this.refreshPages();
  }

  private refreshPages() {
    this.zone.run(() => {
      this.api.get<any>('users/me/pages')
        .subscribe(data => {
          this.pages = data;
          console.log(this.pages);
        });
    });
  }
}
