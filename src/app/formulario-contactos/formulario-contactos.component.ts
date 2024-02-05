import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-formulario-contactos',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './formulario-contactos.component.html',
  styleUrl: './formulario-contactos.component.css'
})
export class FormularioContactosComponent {
  constructor(private router: Router) {}
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('form') form!: ElementRef;

  formularioEnviado = false;

  enviarFormulario() {
    this.formularioEnviado = true;
    setTimeout(() => {
      this.formularioEnviado = false;
    }, 5000);
  }
}
