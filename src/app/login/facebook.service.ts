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
    FB.login(this.handleStatus.bind(this));
  }

  logout() {
    this.clearToken();
  }

  isLoggedIn() {
    return localStorage.getItem('fb_token');
  }

  private handleStatus(response) {
    switch(response.status) {
      case 'connected':
        localStorage.setItem('fb_uid', response.authResponse.userID);
        localStorage.setItem('fb_token', response.authResponse.accessToken);
        this.loggedInCallback();
        break;
      
      case 'not_authorized':
        this.clearToken();
        this.notAuthorizedCallback();
        break;
      
      default:
        this.clearToken();
        this.loggedOutCallback();
        break;
    }
  }

  private checkLoginStatus() {
    FB.getLoginStatus(this.handleStatus.bind(this));
  }

  private clearToken() {
    localStorage.removeItem('fb_uid');
    localStorage.removeItem('fb_token');
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

  isLoggedIn() {
    return this.loginStatus.isLoggedIn();
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
