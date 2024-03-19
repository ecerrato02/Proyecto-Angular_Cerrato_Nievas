import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-formulario-contactos',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    FormsModule
  ],
  templateUrl: './formulario-contactos.component.html',
  styleUrl: './formulario-contactos.component.css'
})
export class FormularioContactosComponent {

  name: string = '';
  email: string = '';
  subject: string = '';
  information: string = '';
  constructor(private http: HttpClient) {}
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('form') form!: ElementRef;

  formularioEnviado = false;

  enviarFormulario() {
    this.formularioEnviado = true;
    this.http.post<any>("http://localhost:3080/api/contactForm", {subject: this.subject, email: this.email, information: this.information, name: this.name}).subscribe((data) => {

    })
    setTimeout(() => {
      this.formularioEnviado = false;
    }, 5000);
  }
}
