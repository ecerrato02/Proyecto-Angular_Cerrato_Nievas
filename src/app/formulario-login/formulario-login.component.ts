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
  errorMessage = '';
  parametrosIncorrectos = false;
  constructor(private router: Router, private userService: UsuariosService, private http: HttpClient) {}

  login() {
    this.userService.loginUser(this.username, this.password)
      .then((response) => {
        console.log('Inicio de sesión exitoso:', response);
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', response.username);
        this.parametrosIncorrectos = false;
        this.loginLog();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.parametrosIncorrectos = true;
        setTimeout(() => {
          this.parametrosIncorrectos = false;
        }, 5000);
        this.sendLoginAttemptLog();
      });
  }

  async loginWallet() {
    // @ts-ignore
    if (typeof window.ethereum !== "undefined") {
      try {
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Cartera iniciada:', accounts);
        if (accounts.length > 0) {
          sessionStorage.setItem('address', accounts[0]);
        }
        this.login();
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión con MetaMask';
        this.parametrosIncorrectos = true;
        setTimeout(() => {
          this.parametrosIncorrectos = false;
        }, 5000);
      }
    } else {
      this.parametrosIncorrectos = true;
      this.errorMessage = 'Debes instalar MetaMask';
      setTimeout(() => {
        this.parametrosIncorrectos = false;
      }, 5000);
    }
  }

  sendLoginAttemptLog() {
    const logData = { information: 'Se ha intentado iniciar sesión' };
    this.http.post<any>('http://localhost:3080/api/logs', logData)
  }

  loginLog() {
    const logData = { username: sessionStorage.getItem("username"), information: "ha iniciado sesión correctamente" };
    this.http.post<any>('http://localhost:3080/api/logs', logData).subscribe({
      next: (response) => {
        console.log('Registro de inicio de sesión enviado al backend:', response);
      },
      error: (error) => {
        console.error('Error al enviar el registro de inicio de sesión al backend:', error);
      }
    });
  }
}
