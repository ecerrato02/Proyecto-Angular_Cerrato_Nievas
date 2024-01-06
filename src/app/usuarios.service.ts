import { Injectable } from '@angular/core';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios: any[][]
  constructor() {
    const usuariosRegistrados = sessionStorage.getItem('usuarios')
    this.usuarios = usuariosRegistrados ? JSON.parse(usuariosRegistrados):[[],[]]
  }
  usuarioNuevo(email: string, password: string){
    this.usuarios[0].push(email)
    this.usuarios[1].push(password)
    sessionStorage.setItem('usuarios', JSON.stringify(this.usuarios))
    console.log(this.usuarios)
  }
  login(email: string, password: string){
    for(let i = 0; i < this.usuarios[0].length; i++){
      if (this.usuarios [0][i] === email && this.usuarios [1][i] === password){
        sessionStorage.setItem('inicio', 'inicio correcto')
      }
    }
  }
}
