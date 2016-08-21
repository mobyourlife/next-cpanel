import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { FacebookService } from './facebook.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private facebook: FacebookService,
    private router: Router
  ) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.facebook.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
