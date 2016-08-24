import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  providers: [AuthService],
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
