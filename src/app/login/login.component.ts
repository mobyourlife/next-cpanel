import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from './facebook.service';

@Component({
  providers: [FacebookService],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  failed = false;

  constructor(
    private facebook: FacebookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.facebook.init({
      appId: '675062689245409'
    });
  }

  ngOnDestroy() {
    this.facebook.destroy();
  }

  login() {
    this.facebook.login()
      .onLoggedIn(() => {
        this.failed = false;
        this.router.navigate(['/']);
      })
      .onNotAuthorized(() => {
        this.failed = true;
      })
      .onLoggedOut(() => {
        this.failed = true;
      })
      .submit();
  }

  logout() {
    this.facebook.logout();
  }
}
