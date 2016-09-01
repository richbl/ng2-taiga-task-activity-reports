import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import {Alerts} from './alerts.service';

@Injectable()
export class TaigaAPIServices {

  private taigaParams = {
    website: null as string, // the taiga website to gather tasks
    authToken: null as string, // session authentication token (derived)
    projectID: null as string, // project ID (derived)
    projectName: null as string, // project name
    adminUsername: null as string, // project user with admin permissions (to access task details)
    adminPassword: null as string, // project user password
    startDate: null as string, // user story start date range
    endDate: null as string, // user story end date range
    showIncompleteTasks: null as string, // whether to include incomplete tasks in results
    users: null as string[], // list of users to gather task summaries
    userName: null as string, // user name (derived)
    userCount: 0 as number, // count of users passed in (derived)
    userID: null as string // user ID of current user (derived)
  };

  private chartObjects: HighchartsOptions = [];

  private self: number = null;
  private callback: Function = null;

  constructor(private alerts: Alerts, private http: Http) { };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public getChartObjects(index): HighchartsOptions {
    return this.chartObjects[index];
  };

  /**
   * ----------------------------------------------------------------------------------
   * Set params used by Taiga.io API
   */
  public setTaigaParams(params) {

    this.taigaParams.website = params.website;
    this.taigaParams.projectName = params.projectName;
    this.taigaParams.adminUsername = params.adminUsername;
    this.taigaParams.adminPassword = params.adminPassword;
    this.taigaParams.startDate = params.startDate;
    this.taigaParams.endDate = params.endDate;
    this.taigaParams.showIncompleteTasks = params.showIncompleteTasks;
    this.taigaParams.users = params.users;
    this.taigaParams.userCount = params.users.length;

  };

  /**
   * ----------------------------------------------------------------------------------
   * Get taiga AUTH_TOKEN used in all subsequent taiga API calls
   */
  public getAuthToken(self, callback) {

    this.httpPost(this.taigaParams.website + '/api/v1/auth', {
      "type": "normal",
      "username": this.taigaParams.adminUsername,
      "password": this.taigaParams.adminPassword
    })
      .subscribe(
      (res) => {
        // this.alerts.showAlert("Taiga authentication succeeded for user " + this.taigaParams.adminUsername + ".", 0);
        this.taigaParams.authToken = res.auth_token;
        callback(self);
      },
      (err) => {
        this.alerts.showAlert("Taiga authentication failed for user " + this.taigaParams.adminUsername + " logging into project URL located at " + this.taigaParams.website, 2);
      });

  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public clearAuthToken() {
    this.taigaParams.authToken = null;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public hasAuthToken(): boolean {
    return (!(this.taigaParams.authToken == null));
  };

  /**
   * ----------------------------------------------------------------------------------
   * Get taiga project ID from project name
   */
  public getProjectIDfromName(self, callback) {

    this.httpGet(this.taigaParams.website + '/api/v1/projects')
      .subscribe(
      (res) => {
        var result = res.filter(item => item.name == this.taigaParams.projectName);

        if (result[0] === undefined) {
          this.alerts.showAlert("Unable to locate project name: " + this.taigaParams.projectName, 2);
        } else {
          this.alerts.showAlert("Project list retrieval succeeded.", 0);
          this.taigaParams.projectID = result[0].id;
          // this.processUsers(taigaParams);
          callback(self);
        }
      },
      (err) => {
        this.alerts.showAlert("Unable to retrieve project ID.", 2);
      });

  };

  /**
 * ----------------------------------------------------------------------------------
 * Get taiga user(s)
 */
  processUsers(self, callback) {

    // set callback to notify completion of processing
    this.self = self;
    this.callback = callback;

    (this.taigaParams.users).forEach(function(userName, index) {

      this.getUserID(this.taigaParams, {
        "userName": userName, // user name
        "index": index, // index of user used for displaying into HTML divs // TODO
        "userID": 0, // user ID (derived)
      });

    }.bind(this)); // function call inside new context

  };

  /**
   * ----------------------------------------------------------------------------------
   * Get username id
   */
  getUserID(taigaParams, userParams) {

    this.httpGet(taigaParams.website + '/api/v1/users?project=' + taigaParams.projectID)
      .subscribe(
      (res) => {
        var result = res.filter(item => item.username == userParams.userName);

        userParams.userID = result[0].id;
        this.alerts.showAlert("User ID retrieval for " + userParams.userName + " succeeded.", 0);
        this.getUserStories(taigaParams, userParams, this.getResults);
      },
      (err) => {
        this.alerts.showAlert("Unable to retrieve user ID for " + userParams.userName + ".", 2);
      });

  };

  /**
   * ----------------------------------------------------------------------------------
   * Get user stories
   */
  getUserStories(taigaParams, userParams, callback) {

    // include/exclude incomplete (in progress) tasks in userstories query
    var closedTasks = "";
    if (!taigaParams.showIncompleteTasks) {
      closedTasks = '\&is_closed=true';
    };

    this.httpGet(taigaParams.website + '/api/v1/userstories?project=' + taigaParams.projectID + '\&assigned_to=' + userParams.userID + closedTasks)
      .subscribe(
      (res) => {
        var newItem = [];
        var callbackCount = res.length;
        this.alerts.showAlert("User stories retrieval succeeded.", 0);

        // build newItem array from JSON returns
        (res).forEach(function(item, index) {

          // check if story date is within requested date range
          if ((item.modified_date < taigaParams.startDate) || (item.modified_date > taigaParams.endDate)) {
            if (!--callbackCount) {
              this.alerts.showAlert("No user stories found matching date criteria for user " + userParams.userName + ".", 1);

            }
          } else {

            // get custom fields (actual_points) and include in final JSON return
            // if no attributes_values, then set to null (user didn't set a value)
            this.getCustomFields(taigaParams, userParams, item.id)
              .map(res => res.json())
              .subscribe(
              (res) => {
                var actualPoints = res.attributes_values[2];

                if (actualPoints === undefined) {
                  actualPoints = null;
                }

                newItem.push({
                  estimated_points: item.total_points,
                  subject: item.subject,
                  story_id: item.id,
                  full_name: item.assigned_to_extra_info.full_name_display,
                  finish_date: item.finish_date,
                  actual_points: actualPoints,
                  project_name: taigaParams.projectName
                });

                // manage callback counts, given we don't know when all callbacks
                // have completed... when all callbacks return, continue
                if (!--callbackCount) {
                  callback(this, taigaParams, userParams, newItem);
                };
              },
              (err) => {
                this.alerts.showAlert("Unable to retrieve user story custom fields.", 2);
              });
          };
        }.bind(this)); // function call inside new context);
      }),

      (err) => {
        this.alerts.showAlert("Unable to retrieve user stories.", 2);
      };

  };

  /**
   * ----------------------------------------------------------------------------------
   * Get user story custom fields (e.g,. actual_points field)
   */
  getCustomFields(taigaParams, userParams, storyID) {

    var authHeader = new Headers();
    authHeader.append('Authorization', 'Bearer ' + taigaParams.authToken);

    return this.http.get(taigaParams.website + '/api/v1/userstories/custom-attributes-values/' + storyID + '?project=' + taigaParams.projectID, {
      headers: authHeader
    });

  };

  /**
 * ----------------------------------------------------------------------------------
 * Process JSON results for highcharts
 */
  processResults(data) {

    // sort tasks by completion date
    data.sort(function(obj1, obj2) {

      const MAX_TIMESTAMP = 8640000000000000;
      var a_date, b_date: Date;

      // if finish_date is null, task is still in works, so assign it max value timestamp
      // so task ends up last (right-most) in list
      !obj1.finish_date ? a_date = new Date(MAX_TIMESTAMP) : a_date = new Date(obj1.finish_date);
      !obj2.finish_date ? b_date = new Date(MAX_TIMESTAMP) : b_date = new Date(obj2.finish_date);
      return b_date < a_date ? 1 : -1;
    });

    return data;

  };

  /**
   * ----------------------------------------------------------------------------------
   * Create highcharts categories from JSON results
   */
  createResultsCategories(data) {

    var arrayLength = data.length;
    var categories = [];

    for (var i = 0; i < arrayLength; i++) {

      if (!data[i]['finish_date']) {
        categories[i] = data[i]['subject'] + "<br>[In Progress]";
      } else {
        categories[i] = data[i]['subject'] + "<br>[Done]";
      };

    };
    return categories;

  };

  /**
 * ----------------------------------------------------------------------------------
 * Create highcharts series from JSON results
 */
  createResultsSeries(data) {

    var arrayLength = data.length;
    var estimatedPoints = [];
    var actualPoints = [];
    var diffPoints = [];
    var cumDiffPoints = [];
    var cumPoints = [];

    for (var i = 0; i < arrayLength; i++) {

      estimatedPoints[i] = parseInt(data[i]['estimated_points']) || null;
      actualPoints[i] = parseInt(data[i]['actual_points']) || null;

      diffPoints[i] = actualPoints[i] - estimatedPoints[i];

      cumDiffPoints[i] = diffPoints[i];
      cumPoints[i] = actualPoints[i];

      if (i > 0) {
        cumDiffPoints[i] = cumDiffPoints[i - 1] + diffPoints[i];
        cumPoints[i] = cumPoints[i - 1] + actualPoints[i];
      }
    };

    return ([{
      name: 'Estimated (h)',
      data: estimatedPoints
    }, {
        name: 'Actual (h)',
        data: actualPoints

      }, {
        name: 'Diff (h)',
        data: diffPoints

      }, {
        name: 'Cum. Diff (h)',
        data: cumDiffPoints

      }, {
        name: 'Total (h)',
        data: cumPoints
      }]);

  };

  /**
   * ----------------------------------------------------------------------------------
   * Get and process the resultng JSON file for highcharts (hc)
   */
  getResults(self, taigaParams, userParams, json) {

    var results = self.processResults(json);
    var hcCategories = self.createResultsCategories(results);
    var hcSeries = self.createResultsSeries(results);
    var hcDate = self.getDateTime();

    self.plotChart(taigaParams, userParams, hcCategories, hcSeries, hcDate, results);

  };

  /**
 * ----------------------------------------------------------------------------------
 * Set chart plotting options for highcharts object
 */
  plotChart(taigaParams, userParams, categories, series, date, data) {

    this.chartObjects[userParams.index] = ({
      title: {
        text: data[0]['project_name'] + ' Project' + '<br>' + 'Task Activity Report for ' + data[0]['full_name']
      },
      subtitle: {
        text: 'Activity Date Range: ' + (new Date(taigaParams.startDate)).toJSON().slice(0, 10) + ' to ' + (new Date(taigaParams.endDate)).toJSON().slice(0, 10) + '<br>' + 'Report Generated on ' + date
      },
      xAxis: {
        gridLineWidth: 1,
        crosshair: true,
        categories: categories
      },
      yAxis: {
        gridLineWidth: 1,
        title: {
          text: 'Hours (h)',
        }
      },

      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
        },
      },

      series: series
    });

    // complete, so notify caller
    this.callback(this.self, userParams.index);

  };

  /**
   * ----------------------------------------------------------------------------------
   * Simple wrapper around http.post()
   */
  private httpPost(url, data) {

    var headers = new Headers({ 'Content-Type': 'application/json' });
    var options = new RequestOptions({ headers: headers });

    return this.http.post(url, data, options)
      .map(res => res.json());

  };

  /**
   * ----------------------------------------------------------------------------------
   * Simple wrapper around http.get()
   */
  private httpGet(url) {

    var authHeader = new Headers();
    authHeader.append('Authorization', 'Bearer ' + this.taigaParams.authToken);

    return this.http.get(url, {
      headers: authHeader
    })
      .map(res => res.json());

  };

  /**
   * ----------------------------------------------------------------------------------
   * Datetime formatter
   */
  getDateTime() {

    var local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10) + " at " + local.toJSON().slice(11, 19);

  };

}
