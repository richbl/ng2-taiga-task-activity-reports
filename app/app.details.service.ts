import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Alerts} from './alerts.service';

@Injectable()
export class AppDetailsServices {

  private self: number = null;
  private callback: Function = null;

  constructor(private alerts: Alerts, private http: Http) { };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  private httpGet(url: string) {

    var authHeader = new Headers();

    return this.http.get(url, {
      headers: authHeader
    })
      .map(res => res.json());

  };

  /**
   * ----------------------------------------------------------------------------------
   * Returns the application version as persisted in package.json
   */
  public getAppVersion(self: any, callback: any) {

    this.self = self;
    this.callback = callback;

    this.httpGet('./package.json')
      .subscribe(
      (res) => {
        callback(self, res['version']);
      },
      (err) => {
        this.alerts.showAlert("Unable to identify application version", 2);
      });

  };

}
