import { Component } from '@angular/core';

import { FacebookService } from '../shared/facebook.service';

@Component({
  providers: [FacebookService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loggedIn = false;

  constructor(
    private facebook: FacebookService
  ) {
    facebook.init({
      appId: '675062689245409'
    });
  }

  login() {
    this.facebook.login()
      .loggedIn((uid, token) => {
        console.log('Autenticou com sucesso!', uid, token);
        this.loggedIn = true;
      })
      .notAuthorized(() => {
        console.log('Aplicativo não autorizado!');
      })
      .loggedOut(() => {
        console.log('Não está logado no Facebook!');
      })
      .submit();
  }

  logout() {
    this.facebook.logout();
    this.loggedIn = false;
  }
}
