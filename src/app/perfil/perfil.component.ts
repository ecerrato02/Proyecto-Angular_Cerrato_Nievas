import {Component, AfterViewInit, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {UsuariosService} from "../usuarios.service";
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  username = '';
  email = '';
  editEmail = '';
  password = '';
  confirmPass = '';
  maskedPassword = "*".repeat(8);
  originalEmail = "";
  isEditing = false;
  isLoggedIn = false;
  newEmail = '';

  userUsername: string | null = sessionStorage.getItem('username');


  constructor(private http: HttpClient, public userService: UsuariosService, private router: Router) {
  }

  editProfile() {
    this.isEditing = true;
    this.editEmail = '';
  }

  saveProfile() {
    if (this.newEmail.includes('@') && this.newEmail.includes('.')) {
      this.http.post<any>('http://localhost:3080/api/verify', {
        email: this.email,
        password: this.password
      }).subscribe({
        next: (response) => {
          if (response.success) {
            this.http.put<any>('http://localhost:3080/api/user2/' + this.username, {
              email: this.newEmail
            }).subscribe({
              next: (updateResponse) => {
                if (updateResponse.success) {
                  this.email = this.newEmail;
                  this.email = '';
                  this.password = '';
                  this.confirmPass = '';
                  this.isEditing = false;
                  alert('Correo electrónico actualizado correctamente.');
                } else {
                  alert('Error al actualizar el correo electrónico.');
                }
              },
              error: (error) => {
                console.error('Error al actualizar el correo electrónico:', error);
              }
            });
          } else {
            alert('La contraseña o el correo electrónico actual son incorrectos.');
          }
        }
      });
    } else {
      alert('Correo inválido.');
    }
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editEmail = this.originalEmail;
    this.confirmPass = '';
    this.newEmail = '';
  }

  resetPassword() {
    this.http.post<any>('http://localhost:3080/api/reset-password', {
      email: this.email,
      username: this.userUsername
    }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Se ha enviado un correo electrónico para restablecer la contraseña.');
        } else {
          alert('No se pudo enviar el correo electrónico para restablecer la contraseña.');
        }
      }
    });
  }

  ngOnInit() {
    this.userService.loggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        const usernameFromStorage = sessionStorage.getItem('username');
        if (usernameFromStorage) {
          this.http.get<any>('http://localhost:3080/api/user/' + usernameFromStorage).subscribe({
            next: (userData: { nombre: string; email: string; contraseña: string }) => {
              this.username = userData.nombre;
              this.email = userData.email;
              const hasta = this.email.indexOf('@');
              const tresLetras = this.email.substring(0, 3);
              const esconderEmail = this.email.substring(3, hasta).replace(/./g, '*');
              this.editEmail = tresLetras + esconderEmail + this.email.substring(hasta);
              this.originalEmail = this.editEmail;
              this.password = userData.contraseña;
            }
          });
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
