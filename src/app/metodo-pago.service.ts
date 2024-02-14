import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
tarjeta = true;
paypal = false;

pagoTarjeta(){
  this.tarjeta = true;
  this.paypal = false;
}

pagoPayPal(){
  this.tarjeta = false;
  this.paypal = true;
}
  constructor() { }
}
