import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UsuariosService} from "../usuarios.service"
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf,
    HttpClientModule,
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
    // @ts-ignore
    let correo = document.getElementById('email').value
    // @ts-ignore
    let contraConfirm = document.getElementById('confirmPass').value
      if (this.aceptarPolitica != true){
        this.mostrarMensajeAceptarPolitica = true;
        setTimeout(() => {
          this.mostrarMensajeAceptarPolitica = false;
        }, 2000);
      } else{
        this.userServ.registro(username, correo, password, contraConfirm)
      }
  }
}
