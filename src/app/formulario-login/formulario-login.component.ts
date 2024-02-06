import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, Router} from "@angular/router";
import {UsuariosService} from "../usuarios.service";

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {
  username: string;
  password: string;
  constructor(private router: Router, private userServ: UsuariosService) {
    this.username = 'username';
    this.password = 'password';
  }

  login(): void{
    // @ts-ignore
    const usernameElement = document.getElementById('username').value;
    // @ts-ignore
    const passwordElement = document.getElementById('password').value;
    this.userServ.login(usernameElement, passwordElement)
    if (sessionStorage.getItem('inicio') === 'inicio correcto'){
      this.router.navigate([''])
    }
    else alert('Los parámetros son incorrectos, inténtalo de nuevo')
  }
}
