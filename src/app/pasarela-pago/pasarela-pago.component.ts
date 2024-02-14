import { Component } from '@angular/core';
import { MetodoPagoService } from "../metodo-pago.service";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { IdProductosService } from "../id-productos.service";

@Component({
  selector: 'app-pasarela-pago',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.css'
})
export class PasarelaPagoComponent {
  rellenaTodosCampos = false;
  constructor(public MetodoPagoService : MetodoPagoService, public idProductosService: IdProductosService) {
  }
  tarjetaPagar = this.MetodoPagoService.tarjeta;
  paypalPagar = this.MetodoPagoService.paypal;
  cardNumber: string = '';
  cardHolder: string = '';
  expiryDate: string = '';
  cvv: string = '';
  isFlipped: boolean = false;

  formatCardNumber(event: any): void {
    let inputValue = event.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    let formattedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += inputValue[i];
    }
    this.cardNumber = formattedValue.trim();
  }

  formatExpiryDate(event: any): void {
    let inputValue = event.target.value.replace(/[^0-9]/g, '');
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
    }
    this.expiryDate = inputValue;
  }

  validateCVV(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      event.preventDefault();
    }
  }

  validateCardNumber(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 32) {
      event.preventDefault();
    }
  }

  validateExpiryDate(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 47) {
      event.preventDefault();
    }
  }

  flipCard(isFlipped: boolean): void {
    this.isFlipped = isFlipped;
  }

  validarCampos(): boolean {
    if (this.cardNumber.length === 19 && this.cardHolder.length > 0 && this.expiryDate.length === 5 && this.cvv.length === 3) {
      return true;
    } else {
      return false;
    }
  }

  camposIncorrectos(){
    if(!this.validarCampos()){
      this.rellenaTodosCampos = true;
    } else{
      this.rellenaTodosCampos = false;
    }
  }

  restablecerMetodoPago(){
    this.MetodoPagoService.tarjeta = true;
    this.MetodoPagoService.paypal = false;
    this.idProductosService.claveProducto()
  }
}
