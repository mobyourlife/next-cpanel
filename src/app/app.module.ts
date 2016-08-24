import { NgModule, provide } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApiService } from './shared';
import { routing } from './app.routing';

import { AuthGuard, AuthService } from './login';

import { ENV_CONFIG } from './config';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    ApiService,
    provide('app.config', { useValue: ENV_CONFIG }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
