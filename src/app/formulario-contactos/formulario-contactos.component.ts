import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RecaptchaModule} from "ng-recaptcha";
import { FormsModule} from "@angular/forms";

@Component({
  selector: 'app-formulario-contactos',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    FormsModule,
    RecaptchaModule,
    HttpClientModule,
  ],
  templateUrl: './formulario-contactos.component.html',
  styleUrl: './formulario-contactos.component.css'
})
export class FormularioContactosComponent {

  name: string = '';
  email: string = '';
  subject: string = '';
  information: string = '';
  constructor(private http: HttpClient) {
  }
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('form') form!: ElementRef;
  captchaCompleted: boolean = false;


  formularioEnviado = false;
  onCaptchaResolved(response: any) {
    console.log('reCAPTCHA resolved with response:');
    if (response) {
      this.captchaCompleted = true;
    }
  }
  submitForm(){
    if(this.captchaCompleted){
      this.enviarFormulario();
    }
  }
  enviarFormulario() {
    this.formularioEnviado = true;
    this.http.post<any>("http://172.16.10.1:3080/api/contactForm", {subject: this.subject, email: this.email, information: this.information, name: this.name}).subscribe((data) => {
    })
    setTimeout(() => {
      this.formularioEnviado = false;
    }, 5000);
    setTimeout(() => {
      window.location.reload();
    }, 5000);

  }
  protected readonly onclick = onclick;
}
