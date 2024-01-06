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
  email: string;
  password: string;
  constructor(private router: Router, private userServ: UsuariosService) {
    this.email = 'email';
    this.password = 'password';
  }

  login(): void{
    // @ts-ignore
    const emailElement = document.getElementById('email').value;
    // @ts-ignore
    const passwordElement = document.getElementById('password').value;
    this.userServ.login(emailElement, passwordElement)
    if (sessionStorage.getItem('inicio') === 'inicio correcto'){
      console.log(emailElement, passwordElement)
      this.router.navigate([''])
    }
    else alert('Los parámetros son incorrectos, inténtalo de nuevo')
  }
}
