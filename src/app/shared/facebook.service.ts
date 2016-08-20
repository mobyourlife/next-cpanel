import { Injectable } from '@angular/core';

declare var FB: any;

class LoginStatus {
  public status: string;
  public uid: number;
  public token: string;

  private loggedInCallback: Function;
  private notAuthorizedCallback: Function;
  private loggedOutCallback: Function;

  loggedIn(cb) {
    this.loggedInCallback = cb;
    return this;
  }

  notAuthorized(cb) {
    this.notAuthorizedCallback = cb;
    return this;
  }

  loggedOut(cb) {
    this.loggedOutCallback = cb;
    return this;
  }

  submit() {
    FB.login(this.handleStatus.bind(this));
  }

  logout() {
    FB.logout(this.checkLoginStatus.bind(this));
  }

  private handleStatus(response) {
    this.status = response.status;

    switch(response.status) {
      case 'connected':
        this.loggedInCallback(response.authResponse.userID, response.authResponse.accessToken);
        break;
      
      case 'not_authorized':
        this.notAuthorizedCallback();
        break;
      
      default:
        this.loggedOutCallback();
        break;
    }
  }

  private checkLoginStatus() {
    FB.getLoginStatus(response => {
      this.handleStatus(response);
    });
  }
}

@Injectable()
export class FacebookService {
  private appId: string;
  private loginStatus: LoginStatus;

  constructor() {
    this.loginStatus = new LoginStatus();
  }

  init(config) {
    this.appId = config.appId;
    this.initService();
  }

  login() {
    return this.loginStatus;
  }

  logout() {
    return this.loginStatus.logout();
  }

  private initService() {
    window['fbAsyncInit'] = this.initSdk.bind(this);
    this.loadSdk();
  }

  private initSdk() {
    FB.init({
      appId: this.appId,
      xfbml: false,
      version: 'v2.7'
    });
  }

  private loadSdk() {
    const JS_SDK = 'facebook-jssdk';

    if (document.getElementById(JS_SDK)) {
      return;
    }

    let js = document.createElement('script');
    js.id = JS_SDK;
    js.src = '//connect.facebook.net/pt_BR/sdk.js';
    document.body.appendChild(js);
  }
}
