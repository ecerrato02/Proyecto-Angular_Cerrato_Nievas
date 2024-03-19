import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {RecaptchaModule} from "ng-recaptcha";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-formulario-contactos',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    RecaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-contactos.component.html',
  styleUrl: './formulario-contactos.component.css'
})
export class FormularioContactosComponent {
  contactForm: FormGroup;
  captchaCompleted: boolean = false;
  formularioEnviado = false;


  constructor(private router: Router, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: '',
      correo: '',
      asunto: '',
      descripcion: '',
      recaptcha: '',
    });

  }

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
    setTimeout(() => {
      this.formularioEnviado = false;
    }, 5000);
  }
  protected readonly onclick = onclick;
}

