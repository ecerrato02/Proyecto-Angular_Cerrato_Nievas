import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UsuariosService} from "../usuarios.service"
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {

  parametersMissing = false;
  constructor(private router: Router, private userServ: UsuariosService) {
  }

  registrarUsuario() {
    // @ts-ignore
    let username = document.getElementById('username').value
    // @ts-ignore
    let password = document.getElementById('password').value
    if (username != '' && password != '') {
      this.userServ.usuarioNuevo(username, password)
      this.router.navigate(['/formulario-login'])
    } else {
      this.parametersMissing = true;
    }
  }
}
