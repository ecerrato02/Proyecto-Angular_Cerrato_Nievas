import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, Router} from "@angular/router";
import {UsuariosService} from "../usuarios.service";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {
  username: string;
  password: string;
  parametrosIncorrectos = false;
  constructor(private router: Router, private userService: UsuariosService) {
    this.username = 'username';
    this.password = 'password';
  }

  login(): void{
    // @ts-ignore
    const usernameElement = document.getElementById('username').value;
    // @ts-ignore
    const passwordElement = document.getElementById('password').value;
    this.userService.login(usernameElement);
  }
}
