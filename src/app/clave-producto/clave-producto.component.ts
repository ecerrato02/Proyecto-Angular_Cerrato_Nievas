import {Component, OnInit} from '@angular/core';
import { IdProductosService } from "../id-productos.service";
import {productos} from "../bd/productos";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-clave-producto',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './clave-producto.component.html',
  styleUrl: './clave-producto.component.css'
})
export class ClaveProductoComponent implements OnInit{
  steam = false;
  ubisoft = false;
  xbox = false;
  playstation = false;
  switch = false;
  plataforma = this.idProductosService.plataformaSeleccionada;
  nombreProducto: string[] = [];
  productosEnCesta: productos[] = [];

  constructor(public idProductosService: IdProductosService, private http: HttpClient) {}
  ngOnInit() {
    this.obtenerPlataforma();
    this.nombreProducto = this.idProductosService.nombreProductos;
    this.productosEnCesta = this.idProductosService.obtenerProductosEnCesta();
    this.finalizado();
  }


  obtenerPlataforma(){
    switch (this.plataforma) {
      case "PC - Steam":
        this.steam = true;
      break;
      case "PC - Ubisoft":
        this.ubisoft = true;
      break;
      case "Xbox Series X/S":
        this.xbox = true;
      break;
      case "PlayStation4":
        this.playstation = true;
      break;
      case "PlayStation5":
        this.playstation = true;
      break;
      case "Nintendo Switch":
        this.switch = true;
      break;
      default:
      break;
    }
  }

  finalizado(){
    this.compraFinalizadaLog()
    this.guardarCompra(this.precioTotal, this.usuarioPedido, this.productosCarrito);
    this.idProductosService.vaciarCarritoCompra();
  }

  usuarioPedido = sessionStorage.getItem("username");
  precioTotal = this.idProductosService.totalCarrito;
  productosCarrito = this.idProductosService.arrayCarrito;


  guardarCompra(precioTotal: any, usuarioPedido: any, productosCarrito: any) {
    this.http.post<any>('http://169.254.118.225:3080/api/afegirComanda', { usuarioPedido: usuarioPedido, precioTotal: precioTotal, productosCarrito: productosCarrito })
      .subscribe(
        response => {
          console.log('Pedido guardado correctamente:', response);
        },
        error => {
          console.error('Error al agregar pedido:', error);
        }
      );
  }

  compraFinalizadaLog(){
    let username = sessionStorage.getItem("username")
    const logData = { username: username, information: "ha finalizado su compra" };
    this.http.post<any>('http://169.254.118.225:3080/api/logs', logData).subscribe({});
  }

}
