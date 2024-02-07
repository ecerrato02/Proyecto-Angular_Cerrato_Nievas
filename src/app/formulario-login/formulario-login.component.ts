import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, Router} from "@angular/router";
import {UsuariosService} from "../usuarios.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {
  username: string;
  password: string;

  contrasenaIncorrecta = false;
  constructor(private router: Router, private userService: UsuariosService) {
    this.username = 'username';
    this.password = 'password';
  }

  login(): void{
    // @ts-ignore
    const usernameElement = document.getElementById('username').value;
    // @ts-ignore
    const passwordElement = document.getElementById('password').value;
    this.userService.login(usernameElement, passwordElement)
    if (sessionStorage.getItem('inicio') === 'inicio correcto'){
      this.userService.changeUsername(usernameElement);
      this.router.navigate([''])
    } else {
      this.contrasenaIncorrecta = true;
    }
  }
}
