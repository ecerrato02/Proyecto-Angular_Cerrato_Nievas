import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  username = 'Nombre de usuario actual';
  email = 'Correo electrónico actual';
  password = '12315152!';
  maskedPassword = "*".repeat(this.password.length);
  originalEmail = this.email;
  isEditing = false;

  editProfile() {
    this.isEditing = true;
    this.email = '';
  }

  saveProfile() {
    this.isEditing = false;
    this.originalEmail = this.email;
  }

  cancelEdit() {
    this.isEditing = false;
    this.email = this.originalEmail;
  }
}
