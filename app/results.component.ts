import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {CHART_DIRECTIVES} from 'angular2-highcharts';

import {Alerts} from './alerts.service';
import {TaigaAPIServices} from './taigaapi.service';

@Component({
  selector: 'login',
  directives: [CHART_DIRECTIVES, AlertComponent],
  templateUrl: 'app/results.component.html'
})

export class Results {

  chartObjects: HighchartsOptions = [];

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  constructor(private taigaAPI: TaigaAPIServices, private alerts: Alerts, private router: Router) { };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  ngOnInit() {

    if (!this.taigaAPI.hasAuthToken()) {
      this.router.navigate(['Login']);
    };

    this.alerts.clearAlerts();

    // generate charting results through the taiga API (the first call after authentication)
    this.taigaAPI.processUsers(this, this.plotChart);

  };

  /**
   * ----------------------------------------------------------------------------------
   * Callback function on completion of processUsers()
   */
  plotChart(self, index) {
    self.chartObjects[index] = self.taigaAPI.getChartObjects(index);
  };

}
