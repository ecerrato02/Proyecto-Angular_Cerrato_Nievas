import {Component, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";



@Component({
  standalone: true,
  imports: [HttpClientModule],
  template: ``
})
@Injectable({
  providedIn: 'root',
})

export class UsuariosService {

  usuarios: any[][]
  private usernameSource = new BehaviorSubject<string | null>(sessionStorage.getItem('username'));
  currentUsername = this.usernameSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    const usuariosRegistrados = sessionStorage.getItem('usuarios')
    this.usuarios = usuariosRegistrados ? JSON.parse(usuariosRegistrados) : [[], []]
  }
  registro(nombre: string, email: string, contra: string, contraConfirm: string) {
    if (contra === contraConfirm){
      if (contra.length >= 8 && contra.length <=32 ) {
        this.http.post<any>("http://localhost:3080/prueba2", {nombre: nombre, email: email, contra: contra}).subscribe((boolean ) => {
          if(boolean === "true"){
            this.router.navigate(['/login'])
          }else {
            alert("Ese nombre de ususario ya existe")
          }
        })
      }else{alert("La contraseña debe ser de más de 8 carácteresy menos de 32")}
    }else{alert("La contraseñas no coinciden")}
  }

  changeUsername(username: string | null) {
    this.usernameSource.next(username);
    if (username !== null) {
      sessionStorage.setItem('username', username);
    } else {
      sessionStorage.removeItem('username');
    }
  }

  login(username: string, password: string) {
    for (let i = 0; i < this.usuarios[0].length; i++) {
      if (this.usuarios [0][i] === username && this.usuarios [1][i] === password) {
        sessionStorage.setItem('inicio', 'inicio correcto')
      }
    }
  }
}
