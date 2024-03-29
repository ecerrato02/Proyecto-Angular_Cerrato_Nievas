import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, Router} from "@angular/router";
import {UsuariosService} from "../usuarios.service";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {
  username = "";
  password = "";
  parametrosIncorrectos = false;
  constructor(private router: Router, private userService: UsuariosService, private http: HttpClient) {}

  login() {
    this.userService.loginUser(this.username, this.password)
      .then((response) => {
        console.log('Inicio de sesión exitoso:', response);
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', response.username);
        this.router.navigate(['']);
        this.parametrosIncorrectos = false;
        this.loginLog();
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        this.parametrosIncorrectos = true;
        this.sendLoginAttemptLog();
      });
  }
  sendLoginAttemptLog() {
    const logData = { information: 'Se ha intentado iniciar sesión' };
    this.http.post<any>('http://172.16.10.1:3080/api/logs', logData)
  }

  loginLog() {
    const logData = { username: sessionStorage.getItem("username"), information: "ha iniciado sesión correctamente" };
    this.http.post<any>('http://172.16.10.1:3080/api/logs', logData).subscribe({
      next: (response) => {
        console.log('Registro de inicio de sesión enviado al backend:', response);
      },
      error: (error) => {
        console.error('Error al enviar el registro de inicio de sesión al backend:', error);
      }
    });
  }
}
