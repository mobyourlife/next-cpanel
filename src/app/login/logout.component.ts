import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from './facebook.service';

@Component({
  providers: [FacebookService],
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private facebook: FacebookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.facebook.logout();
    this.router.navigate(['/']);
  }
}
