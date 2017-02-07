import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TaigaAPIServices} from './taigaapi.service';

@Injectable()
export class ResultsGuard implements CanActivate {

  constructor(private taigaAPI: TaigaAPIServices, private router: Router) { }

  /**
   * ----------------------------------------------------------------------------------
   * Confirm user's authentication before proceeding to results page
   */
  canActivate() {
    if (this.taigaAPI.hasAuthToken()) {
      return true;
    }
    else {
      this.router.navigateByUrl('login');
      return false;
    };
  };

}
