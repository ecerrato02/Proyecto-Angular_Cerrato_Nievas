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

  loggedIn = false;
  usuarioCorreoYaExiste = false;
  contrasenaCorta = false;
  contrasenaLarga = false;
  contrasenaNoCoincide = false;
  usernamePassIncorrect = false;
  private usernameSource = new BehaviorSubject<string | null>(sessionStorage.getItem('username'));
  currentUsername = this.usernameSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {}
  registro(nombre: string, email: string, contra: string, contraConfirm: string) {
    if (contra === contraConfirm){
      if (contra.length >= 8) {
        if (contra.length <=32){
          this.http.post<any>("http://localhost:3080/api/registro", {nombre: nombre, email: email, contra: contra}).subscribe((boolean ) => {
            if(boolean === "true"){
              this.router.navigate(['/login'])
            }else {
              this.usuarioCorreoYaExiste = true;
              setTimeout(() => {
                this.usuarioCorreoYaExiste = false;
              }, 5000);
            }
          })
        } else{
          this.contrasenaLarga = true;
          setTimeout(() =>{
            this.contrasenaLarga = false;
          }, 5000);
        }
      }else{
        this.contrasenaCorta = true;
        setTimeout(() =>{
          this.contrasenaCorta = false;
        }, 5000);
      }
    }else{
      this.contrasenaNoCoincide = true;
      setTimeout(() => {
        this.contrasenaNoCoincide = false;
      }, 5000);
    }
  }

  login(password: string) {
    this.http.get<any>("http://localhost:3080/api/login").subscribe((pass) => {
      if (pass === password){
        this.loggedIn = true;
      } else{
        this.usernamePassIncorrect = true;
        setTimeout(() => {
          this.usernamePassIncorrect = false;
        }, 5000);
      }
    })
  }
}
