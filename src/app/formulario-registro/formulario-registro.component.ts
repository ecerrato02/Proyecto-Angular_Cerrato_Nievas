import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {UsuariosService} from "../usuarios.service"


@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {
  constructor(private router: Router, private userServ: UsuariosService) {
  }

  registrarUsuario() {
    // @ts-ignore
    let email = document.getElementById('email').value
    // @ts-ignore
    let password = document.getElementById('password').value
    if (email != '' && password != '') {
      this.userServ.usuarioNuevo(email, password)
      this.router.navigate(['/formulario-login'])
    }
    else alert('No se ha registrado el usuario, faltan parámetros')
  }
}
