import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, Router} from "@angular/router";
import {UsuariosService} from "../usuarios.service";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {
  username = "";
  password = "";
  parametrosIncorrectos = false;
  constructor(private router: Router, private userService: UsuariosService) {}

  login() {
    this.userService.loginUser(this.username, this.password)
      .then((response) => {
        console.log('Inicio de sesión exitoso:', response);
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', response.username);
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        this.parametrosIncorrectos = true;
      });
  }
}
