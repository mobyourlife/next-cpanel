import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout';
import { AuthGuard, LoginComponent, LogoutComponent } from './login';

import { NotFoundComponent } from './error';

import { HomeComponent, CriarNovoSiteComponent } from './home';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    children: [
      { path: '', component: HomeComponent },
      { path: 'criar-novo-site', component: CriarNovoSiteComponent },
    ],

    canActivate: [AuthGuard],
    component: LayoutComponent,
    path: ''
  },
  { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
