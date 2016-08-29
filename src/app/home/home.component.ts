import { Component, OnInit, NgZone } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { Site } from './site.model';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  sites: Site[];

  constructor(
    private api: ApiService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    console.log('Hello Home');
    this.refreshSites();
  }

  private refreshSites() {
    this.zone.run(() => {
      this.api.get<any>('users/me/sites')
        .subscribe(data => {
          this.sites = data;
        });
    });
  }
}
