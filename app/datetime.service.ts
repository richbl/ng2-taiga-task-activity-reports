import {Injectable} from '@angular/core';

@Injectable()
export class DateTimeService {

  private dtModel = {
    minDate: null,
    maxDate: new Date(2020, 5, 22),
    dtStart: null,
    dtEnd: null,
    dtOptions: {
      formatYear: 'yy',
      startingDay: 1
    }
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public getDtModel() {
    return this.dtModel;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public getOptions() {
    return this.dtModel.dtOptions;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public setStartDate(startDate) {
    this.dtModel.dtStart = startDate;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public setEndDate(endDate) {
    this.dtModel.dtEnd = endDate;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public getStartDate() {
    return this.dtModel.dtStart;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public getEndDate() {
    return this.dtModel.dtEnd;
  };

  /**
   * ----------------------------------------------------------------------------------
   * Set start month to the first day of the current month
   */
  public setStartMonth() {

    var x = new Date();
    x.setDate(1);
    x.setHours(0, 0, 0, 0);
    x.setMonth(x.getMonth());
    this.dtModel.dtStart = x;

    x = new Date();
    x.setHours(23, 59, 59, 999);
    this.dtModel.dtEnd = x;

  };

  /**
   * ----------------------------------------------------------------------------------
   * Convert date to specific Taiga-formatted datestring
   */
  public toTaigaFormat(d) {

    function pad(n) {
      return n < 10 ? '0' + n : n
    }

    return d.getUTCFullYear() + '-' +
      pad(d.getUTCMonth() + 1) + '-' +
      pad(d.getUTCDate()) + 'T' +
      pad(d.getUTCHours()) + ':' +
      pad(d.getUTCMinutes()) + ':' +
      pad(d.getUTCSeconds()) + '+' + "0000";

  };

};
