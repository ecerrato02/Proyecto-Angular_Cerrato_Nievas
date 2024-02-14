import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UsuariosService} from "../usuarios.service"
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf
  ],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {

  aceptarPolitica = false;
  mostrarMensajeAceptarPolitica = false;
  camposLlenos = false;
  constructor(private router: Router, private userServ: UsuariosService) {
  }

  registrarUsuario() {
    // @ts-ignore
    let username = document.getElementById('username').value
    // @ts-ignore
    let password = document.getElementById('password').value
    if (username != '' && password != '') {
      if (this.aceptarPolitica === true){
        this.userServ.usuarioNuevo(username, password)
        this.router.navigate(['/login'])
      } else{
        this.mostrarMensajeAceptarPolitica = true;
        setTimeout(() => {
          this.mostrarMensajeAceptarPolitica = false;
        }, 2000);
      }
    } else{
      this.camposLlenos = true;
      setTimeout(() => {
        this.camposLlenos = false;
      }, 5000);
    }
  }
}
