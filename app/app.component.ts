import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {Login} from './login.component';
import {Results} from './results.component';
import {Alerts} from './alerts.service';
import {TaigaAPIServices} from './taigaapi.service';

@Component({
  selector: 'my-app',
  directives: [Login, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, Alerts, TaigaAPIServices],
  template: `<router-outlet></router-outlet>`
})

@RouteConfig([
  { path: '/login', name: 'Login', component: Login, useAsDefault: true },
  { path: '/result', name: 'Results', component: Results }
])

export class AppComponent { }
