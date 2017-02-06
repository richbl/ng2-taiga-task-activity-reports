import {Component} from '@angular/core';

import {Login} from './login.component';
import {Results} from './results.component';
import {Alerts} from './alerts.service';
import {TaigaAPIServices} from './taigaapi.service';

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  public dt: Date = new Date();
  private minDate: Date = null;
  private events: Array<any>;
  private tomorrow: Date;
  private afterTomorrow: Date;
  private formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  private format = this.formats[0];

  private dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };

  private opened: boolean = false;

  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
}
