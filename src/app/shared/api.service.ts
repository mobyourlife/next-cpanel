import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfig } from './app-config.model';

@Injectable()
export class ApiService {
  title = 'Mob Your Life';

  constructor(
    @Inject("app.config") private appConfig: AppConfig,
    private http: Http
  ) { }

  get<T>(endpoint: string): Observable<T> {
    let url = this.transformUrl(endpoint);
    let options = {
      headers: this.bakeHeaders()
    };
    return this.http.get(url, options).map(i => <T>i.json());
  }

  post<T>(endpoint: string, data: Object): Observable<T> {
    let url = this.transformUrl(endpoint);
    let options = {
      headers: this.bakeHeaders()
    };
    return this.http.post(url, data, options).map(i => <T>i.json());
  }

  private transformUrl(endpoint: string) {
    let ret = this.appConfig.apiUrl + endpoint;
    return ret;
  }

  private bakeHeaders(): Headers {
    let ret = new Headers({
      'Content-Type': 'application/json'
    });
    return ret;
  }
}
