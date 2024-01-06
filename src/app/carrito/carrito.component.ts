import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {productos} from "../bd/productos";
import { IdProductosService } from "../id-productos.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    CommonModule,
    FormsModule
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  numeroDeProductosDiferentes = 0;
  animacionesEliminacion: { [idProducto: number]: boolean } = {};
  totalCarrito = 0;

  constructor(public idProductosService: IdProductosService) {
    this.actualizarNumeroDeProductosDiferentes();
    this.actualizarTotalCarrito();
  }

  actualizarNumeroDeProductosDiferentes() {
    this.numeroDeProductosDiferentes = this.idProductosService.arrayCarrito.length;
    this.actualizarTotalCarrito();
  }

  eliminarUnaUnidad(idProducto: number) {
    this.idProductosService.eliminarUnaUnidadCarrito(idProducto);
    this.actualizarTotalCarrito();
  }

  agregarUnaUnidad(idProducto: number) {
    this.idProductosService.agregarUnaUnidadCarrito(idProducto, 1);
    this.actualizarTotalCarrito();
  }


  eliminarTodasUnidades(idProducto: number) {
    const index = this.idProductosService.arrayCarrito.findIndex(p => p.idProducto === idProducto);
    if (index !== -1) {
      this.animacionesEliminacion[idProducto] = true;

      setTimeout(() => {
        this.idProductosService.arrayCarrito.splice(index, 1);
        delete this.animacionesEliminacion[idProducto];
        this.actualizarTotalCarrito();
        this.numeroDeProductosDiferentes = this.numeroDeProductosDiferentes - 1;
        this.actualizarNumeroDeProductosDiferentes();
      }, 1000);
    }

  }

  actualizarTotalCarrito() {
    this.totalCarrito = this.idProductosService.arrayCarrito.reduce((total, item) => {
      return total + (item.precioProducto * item.cantidadProducto);
    }, 0);
  }

  vaciarCarritoCompra(){
    this.idProductosService.vaciarCarrito();
    this.actualizarTotalCarrito();
    this.numeroDeProductosDiferentes = this.numeroDeProductosDiferentes - 1;
    this.actualizarNumeroDeProductosDiferentes();
  }



  protected readonly Number = Number;
}
