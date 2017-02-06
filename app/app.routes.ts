import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Login} from './login.component';
import {Results} from './results.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'results', component: Results },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
