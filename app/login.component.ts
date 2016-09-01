import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router} from '@angular/router-deprecated';
import {Headers, RequestOptions} from '@angular/http';

import {AlertComponent, DATEPICKER_DIRECTIVES, BUTTON_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

import {Dlg} from './dlg.service';
import {DateTimeService} from './datetime.service';
import {Alerts} from './alerts.service';
import {TaigaAPIServices} from './taigaapi.service';

@Component({
  selector: 'login',
  directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, BUTTON_DIRECTIVES, AlertComponent],
  viewProviders: [BS_VIEW_PROVIDERS],
  providers: [Dlg, DateTimeService],
  templateUrl: 'app/login.component.html',
})

export class Login {

  private dlgModel = null;
  private checkModel = null;

  private dtStart: Date = null;
  private dtEnd: Date = null;
  private dtMinDate: Date = null;

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  constructor(private taigaAPI: TaigaAPIServices, private alerts: Alerts, private dlg: Dlg, private dt: DateTimeService, private router: Router) {

    this.dlgModel = dlg.getDlgModel();
    this.checkModel = dlg.getCheckModel();

    dt.setStartMonth();
    this.dtStart = dt.getStartDate();
    this.dtEnd = dt.getEndDate();

    this.dlgModel.radio = '1';

  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  ngOnInit() {

    this.alerts.clearAlerts();
    this.taigaAPI.clearAuthToken();

  };

  /**
   * ----------------------------------------------------------------------------------
   * Prevent end date from preceeding start date
   */
  onClickDateStart() {

    this.dtMinDate = this.dtStart;

    if (this.dtEnd < this.dtMinDate) {
      this.dtEnd = this.dtStart;
    }

  };

  /**
   * ----------------------------------------------------------------------------------
   * Reset dialog state
   */
  onClickReset() {

    this.dlg.resetModels();
    this.dtStart = this.dt.getStartDate();
    this.dtEnd = this.dt.getEndDate();

  };

  /**
   * ----------------------------------------------------------------------------------
   * Process dialog on OK
   */
  onClickOK() {

    var startDate = this.dt.toTaigaFormat(this.dtStart);
    var endDate = this.dt.toTaigaFormat(this.dtEnd);
    var users = [];

    // add users
    for (var key in this.checkModel) {
      if (this.checkModel[key]) {
        users.push(key);
      }
    }

    // set taiga object used in most of the taiga API calls
    this.taigaAPI.setTaigaParams({
      website: this.dlgModel.projecturl,        // the taiga website where projects exist
      projectName: this.dlgModel.projectname,   // project name
      adminUsername: this.dlgModel.username,    // project user with admin permissions (to access task details)
      adminPassword: this.dlgModel.password,    // project user password
      startDate: startDate,                     // user story start date range
      endDate: endDate,                         // user story end date range
      showIncompleteTasks: this.dlgModel.radio, // whether to include incomplete tasks in results
      users: users,                             // list of users to gather task summaries
    });

    // check for valid username/password (returning token), then confirm project name
    this.taigaAPI.getAuthToken(this, this.checkProjectName);

  };

  /**
   * ----------------------------------------------------------------------------------
   * Callback function on completion of getAuthToken()
   */
  checkProjectName(self) {
    self.taigaAPI.getProjectIDfromName(self, self.showResults);
  };

  /**
   * ----------------------------------------------------------------------------------
   * Callback function on completion of getProjectIDfromName()
   */
  showResults(self) {
    self.router.navigate(['Results']);
  };

  /**
   * ----------------------------------------------------------------------------------
   * Validate dialog fields to enable/disable OK button
   */
  validateDlg() {

    for (var key in this.checkModel) {
      if (this.checkModel[key]) {
        return !(this.dlgModel.projectname.length && this.dlgModel.projecturl.length && this.dlgModel.username.length && this.dlgModel.password.length);
      }
    }
    return true;

  };

}
