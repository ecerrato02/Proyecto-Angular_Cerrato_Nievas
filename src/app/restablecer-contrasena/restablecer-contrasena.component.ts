import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UsuariosService} from "../usuarios.service";

@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css'
})
export class RestablecerContrasenaComponent {
  constructor(private usuariosService: UsuariosService) {}

  cambiarContrasena(username: string, newPassword: string, confirmPassword: string) {
    this.usuariosService.changePassword(username, newPassword, confirmPassword)
      .then(response => {
        console.log('Contraseña cambiada');
      })
      .catch(error => {
        console.error('Error al cambiar la contraseña:', error);
      });
  }
}
