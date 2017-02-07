import {Injectable} from '@angular/core';

@Injectable()
export class Dlg {

  private dlgModel = {
    projectname: "",
    projecturl: "",
    username: "",
    password: "",
    radio: 1
  };

  private checkModel = {
    duane: false,
    troje: false,
    richbl: false
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public getDlgModel() {
    return this.dlgModel;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public getCheckModel() {
    return this.checkModel;
  };

  /**
   * ----------------------------------------------------------------------------------
   *
   */
  public resetModels() {

    this.dlgModel.username = "";
    this.dlgModel.password = "";
    this.dlgModel.projectname = "";
    this.dlgModel.projecturl = "";
    this.dlgModel.radio = 1;

    this.checkModel.duane = false;
    this.checkModel.troje = false;
    this.checkModel.richbl = false;

  };

};
