import {Component, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {IdProductosService} from "./id-productos.service";

@Component({
  standalone: true,
  imports: [ HttpClientModule],
  template: ``
})
@Injectable({
  providedIn: 'root',
})

export class UsuariosService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loggedIn = this.loggedInSubject.asObservable();
  username = "";
  usuarioCorreoYaExiste = false;
  contrasenaCorta = false;
  contrasenaLarga = false;
  contrasenaNoCoincide = false;
  usernamePassIncorrect = false;
  private usernameSource = new BehaviorSubject<string | null>(sessionStorage.getItem('username'));
  currentUsername = this.usernameSource.asObservable();

  constructor(private router: Router, private http: HttpClient, private idProductosService: IdProductosService) {
    const loggedInState = sessionStorage.getItem('loggedIn');
    if (loggedInState === 'true') {
      this.loggedInSubject.next(true);
    }
  }
  registro(nombre: string, email: string, contra: string, contraConfirm: string) {
    if (contra === contraConfirm){
      if (contra.length >= 8) {
        if (contra.length <=32){
          this.http.post<any>("http://localhost:3080/api/register", {nombre: nombre, email: email, contra: contra}).subscribe((boolean ) => {
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

 admin = false; ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

  loginUser(username: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://localhost:3080/api/login', { username, password }).subscribe({
        next: (response) => {
          if (response.username) {
            this.loggedInSubject.next(true);
            sessionStorage.setItem('loggedIn', 'true');
            this.admin = false;
            if(username === 'admin' && password === 'admin') {
              this.loggedInSubject.next(true);
              sessionStorage.setItem('loggedIn', 'true');
              console.log("Logeado como administrador")
              this.admin = true;
            }
            resolve(response);
          } else {
            reject(new Error('Error al iniciar sesión'));
          }
        },
        error: (error) => {
          let errorMessage = 'Error al iniciar sesión';
          if (error.status === 400) {
            errorMessage = error.error.message || errorMessage;
          }
          reject(new Error(errorMessage));
        }
      });
    });
  }

  logout() {
    this.loggedInSubject.next(false);
    sessionStorage.removeItem('loggedIn');
    this.admin = false;
    this.idProductosService.vaciarCarrito();
    this.router.navigate(['']);
  }

  changePassword(username: string, newPassword: string, confirmPassword: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (newPassword !== confirmPassword) {
        reject(new Error('Las contraseñas no coinciden'));
      } else {
        this.http.post<any>('http://172.16.10.1:3080/api/change-password', { username, newPassword, confirmPassword }).subscribe({
          next: (response) => {
            if (response.success) {
              resolve(response);
            } else {
              reject(new Error('Error al cambiar la contraseña!'));
            }
          }
        });
      }
    });
  }
}
