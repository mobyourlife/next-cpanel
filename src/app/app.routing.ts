import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout';
import { AuthGuard, LoginComponent, LogoutComponent } from './login';

import { NotFoundComponent } from './error';

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
  },
  { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
