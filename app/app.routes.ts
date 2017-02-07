import {Login} from './login.component';
import {Results} from './results.component';
import {ResultsGuard} from './results.guard';

export const AppRoutes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'results', component: Results, canActivate: [ResultsGuard] },
  { path: '**', redirectTo: '/login' }
]
