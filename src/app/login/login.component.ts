import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from './facebook.service';

@Component({
  providers: [FacebookService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  failed = false;

  constructor(
    private facebook: FacebookService,
    private router: Router
  ) {
    facebook.init({
      appId: '675062689245409'
    });
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
