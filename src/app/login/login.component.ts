import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from './facebook.service';

@Component({
  providers: [FacebookService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
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
        this.router.navigate(['/']);
      })
      .onNotAuthorized(() => {
        console.log('Aplicativo não autorizado!');
      })
      .onLoggedOut(() => {
        console.log('Não está logado no Facebook!');
      })
      .submit();
  }

  logout() {
    this.facebook.logout();
  }
}
