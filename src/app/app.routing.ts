import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout';
import { AuthGuard, LoginComponent, LogoutComponent } from './login';
import { HomeComponent } from './home';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    children: [
      { path: '', component: HomeComponent },
    ],

    canActivate: [AuthGuard],
    component: LayoutComponent,
    path: ''
  }
];

export const routing = RouterModule.forRoot(routes);
