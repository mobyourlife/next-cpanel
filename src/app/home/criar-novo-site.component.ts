import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

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
  creating = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {
    console.log('Hello Home');
    this.refreshPages();
  }

  createSite(page: Page) {
    this.creating = true;
    this.api.post<any>('sites', {
      account_id: this.selected.account_id,
      name: this.selected.name,
      description: this.selected.about
    })
      .subscribe(res => {
        this.router.navigate(['/']);
      });
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
