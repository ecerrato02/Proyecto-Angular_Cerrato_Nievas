import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UsuariosService} from "../usuarios.service";
import {Router} from "@angular/router";

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
  constructor(private usuariosService: UsuariosService, private router: Router) {}

  cambiarContrasena(username: string, newPassword: string, confirmPassword: string) {
    this.usuariosService.changePassword(username, newPassword, confirmPassword)
      .then(response => {
        console.log('Contraseña cambiada');
      })
      .catch(error => {
        console.error('Error al cambiar la contraseña:', error);
      });
  }

  volverInicio(){
    this.router.navigate(['']);
  }
}
