import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {enableProdMode} from '@angular/core';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';

enableProdMode();
bootstrap(AppComponent, [HTTP_PROVIDERS, disableDeprecatedForms(), provideForms()]);
