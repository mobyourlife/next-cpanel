import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from './facebook.service';
import { AuthService } from './auth.service';

@Component({
  providers: [FacebookService],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  failed = false;
  wait = false;

  constructor(
    private facebook: FacebookService,
    private auth: AuthService,
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
      .onLoggedIn((fb_uid, access_token) => {
        this.failed = false;
        this.wait = true;
        this.auth.login(fb_uid, access_token)
          .subscribe(ok => {
            if (ok) {
              this.router.navigate(['/']);
            } else {
              this.wait = false;
              this.failed = true;
            }
          });
      })
      .onNotAuthorized(() => {
        this.failed = true;
      })
      .onLoggedOut(() => {
        this.failed = true;
      })
      .submit();
  }
}
