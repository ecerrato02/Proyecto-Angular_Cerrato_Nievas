import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-formulario-contactos',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './formulario-contactos.component.html',
  styleUrl: './formulario-contactos.component.css'
})
export class FormularioContactosComponent {
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('form') form!: ElementRef;

  enviarFormulario() {
    // Aquí puedes agregar lógica adicional antes de mostrar la alerta
    alert('Se ha enviado este formulario');
  }
}
