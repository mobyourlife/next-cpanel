import { Injectable } from '@angular/core';

declare var FB: any;
const JS_SDK = 'facebook-jssdk';

class LoginStatus {
  private loggedInCallback: Function;
  private notAuthorizedCallback: Function;
  private loggedOutCallback: Function;

  onLoggedIn(cb) {
    this.loggedInCallback = cb;
    return this;
  }

  onNotAuthorized(cb) {
    this.notAuthorizedCallback = cb;
    return this;
  }

  onLoggedOut(cb) {
    this.loggedOutCallback = cb;
    return this;
  }

  submit() {
    FB.login(this.handleStatus.bind(this), {
      scope: 'public_profile, email, manage_pages'
    });
  }

  logout() {
    // FB.logout
  }

  private handleStatus(response) {
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
    FB.getLoginStatus(this.handleStatus.bind(this));
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

  destroy() {
    this.unloadSdk();
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
    if (document.getElementById(JS_SDK)) {
      return;
    }
    let js = document.createElement('script');
    js.id = JS_SDK;
    js.src = '//connect.facebook.net/pt_BR/sdk.js';
    document.body.appendChild(js);
  }

  private unloadSdk() {
    let js = document.getElementById(JS_SDK);
    let root = document.getElementById('fb-root');
    document.body.removeChild(js);
    document.body.removeChild(root);
    FB = null;
  }
}
