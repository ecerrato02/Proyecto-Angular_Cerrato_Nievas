import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { IdProductosService } from "../id-productos.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { MetodoPagoService } from "../metodo-pago.service";
import {productos} from "../bd/productos";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  animacionesEliminacion: { [idProducto: number]: boolean } = {};
  formularioCompleto: boolean = false;

  constructor(public idProductosService: IdProductosService, private router: Router, public MeotodPagoService : MetodoPagoService, private http: HttpClient) {
    this.idProductosService.actualizarNumeroDeProductosDiferentes();
    this.idProductosService.actualizarTotalCarrito();
    this.idProductosService.carritoEmpty();
  }

  pagarTarjeta(){
    this.MeotodPagoService.pagoTarjeta();
  }

  pagarPayPal() {
    this.MeotodPagoService.pagoPayPal();
  }

  verificarFormulario() {
    const campos = document.querySelectorAll('input[required]');
    const camposArray = Array.from(campos);

    let formularioValido = true;

    camposArray.forEach((campo: Element) => {
      if (campo instanceof HTMLInputElement && !campo.value.trim()) {
        formularioValido = false;
      }
    });

    this.formularioCompleto = formularioValido;
  }

  eliminarUnaUnidad(idProducto: number, cantidadProducto: number) {
    const index = this.idProductosService.arrayCarrito.findIndex(p => p.idProducto === idProducto);
    const productoEliminado = this.idProductosService.arrayCarrito[index];

    this.idProductosService.eliminarUnaUnidadCarrito(idProducto);
    this.idProductosService.actualizarTotalCarrito();
    this.eliminadosCarritoLog(productoEliminado);
    if(cantidadProducto <= 1){
      this.idProductosService.actualizarNumeroDeProductosDiferentes();
      this.idProductosService.carritoState = false;
    }
  }

  agregarUnaUnidad(idProducto: number) {
    this.idProductosService.agregarUnaUnidadCarrito(idProducto, 1);
    this.idProductosService.actualizarTotalCarrito();
  }


  eliminarTodasUnidades(idProducto: number) {
    const index = this.idProductosService.arrayCarrito.findIndex(p => p.idProducto === idProducto);
    if (index !== -1) {
      this.animacionesEliminacion[idProducto] = true;

      setTimeout(() => {
        const productoEliminado = this.idProductosService.arrayCarrito[index];
        this.idProductosService.arrayCarrito.splice(index, 1);
        delete this.animacionesEliminacion[idProducto];
        this.idProductosService.actualizarTotalCarrito();
        this.idProductosService.numeroDeProductosDiferentes = this.idProductosService.numeroDeProductosDiferentes - 1;
        this.idProductosService.actualizarNumeroDeProductosDiferentes();
        this.eliminadosCarritoLog(productoEliminado);
      }, 1000);
      if (this.idProductosService.arrayCarrito.length == 0){
        this.idProductosService.carritoState = false;
      }
    }

  }

  eliminadosCarritoLog(productoEliminado: any){
    const logData = { username: sessionStorage.getItem("username"), information: "ha eliminado x" + productoEliminado.cantidadProducto + " " + productoEliminado.nombreProducto + " de la cesta" };
    this.http.post<any>('http://localhost:3080/api/logs', logData).subscribe({});
  }

  finalizarCompra(){
    this.router.navigate(['/pasarela-pago']);
  }

  protected readonly Number = Number;
}
