import { Component, OnInit, NgZone } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { FilterPagesPipe } from './filter-pages.pipe';
import { Page } from './page.model';

@Component({
  pipes: [FilterPagesPipe],
  templateUrl: 'criar-novo-site.component.html',
})
export class CriarNovoSiteComponent implements OnInit {
  pages: Page[];
  selected: Page;

  constructor(
    private api: ApiService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    console.log('Hello Home');
    this.refreshPages();
  }

  selectPage(page: Page) {
    this.selected = page;
  }

  deselectPage() {
    this.selected = null;
  }

  private refreshPages() {
    this.zone.run(() => {
      this.api.get<any>('users/me/pages')
        .subscribe(data => {
          this.pages = data;
        });
    });
  }
}
