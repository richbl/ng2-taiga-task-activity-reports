import {Injectable} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

@Injectable()
export class Alerts {

  public alerts: Array<Object> = [];

  /**
   * ----------------------------------------------------------------------------------
   * Show alert by pushing message to array which is displayed from HTML components
   */
  public showAlert(msg: string, type: number): void {

    var msgType: string;

    switch (type) {
      case 0:
        msgType = "success";
        break;
      case 1:
        msgType = "warning";
        break;
      case 2:
        msgType = "danger";
        break;
      default:
        msgType = "info";
    };

    this.alerts.push({ msg: msg, type: msgType });

  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public clearAlerts() {
    this.alerts = [];
  };

};
