import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private userService: UsuariosService, private router: Router) {}

  canActivate = (): boolean => {
    if (sessionStorage.getItem('isAdmin') === 'true') {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
