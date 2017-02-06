import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ChartModule} from 'angular2-highcharts';
import {DatepickerModule, AlertModule, ButtonsModule} from 'ng2-bootstrap';

import {AppRoutingModule} from './app.routes';
import {AppComponent} from './app.component';
import {Login} from './login.component';
import {Results} from './results.component';

import {Alerts} from './alerts.service';
import {DateTimeService} from './datetime.service';
import {Dlg} from './dlg.service';
import {TaigaAPIServices} from './taigaapi.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule,
    AppRoutingModule,
    FormsModule,
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    Login,
    Results
  ],

  providers: [Alerts, TaigaAPIServices, DateTimeService, Dlg],
  bootstrap: [AppComponent]
})

export class AppModule { }
