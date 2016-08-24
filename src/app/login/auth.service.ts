import { Injectable } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { JwtResponse } from './jwt.model';

const JWT_TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {
  constructor(
    private api: ApiService
  ) { }

  login(fb_uid: string, access_token: string) {
    let data = {
      fb_uid: fb_uid,
      access_token: access_token
    };
    return this.api.post<JwtResponse>('users', data)
      .map(res => {
        if (res && res.id_token) {
          localStorage.setItem(JWT_TOKEN_NAME, res.id_token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    localStorage.removeItem(JWT_TOKEN_NAME);
  }

  isLoggedIn() {
    return !!localStorage.getItem(JWT_TOKEN_NAME);
  }
}
