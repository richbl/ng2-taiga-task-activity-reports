import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ChartModule} from 'angular2-highcharts';
import {DatepickerModule, AlertModule, ButtonsModule} from 'ng2-bootstrap';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {Login} from './login.component';
import {Results} from './results.component';

import {Alerts} from './alerts.service';
import {ResultsGuard} from './results.guard';
import {DateTimeServices} from './datetime.service';
import {Dlg} from './dlg.service';
import {TaigaAPIServices} from './taigaapi.service';
import {AppDetailsServices} from './app.details.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    Login,
    Results
  ],
  providers: [
    Alerts,
    TaigaAPIServices,
    ResultsGuard,
    DateTimeServices,
    Dlg,
    AppDetailsServices
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
