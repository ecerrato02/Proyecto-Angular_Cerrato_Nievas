import {Component, OnInit} from '@angular/core';
import { IdProductosService } from "../id-productos.service";
import {productos} from "../bd/productos";
import {NgForOf, NgIf} from "@angular/common";

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
  abecedario: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
  constructor(public idProductosService: IdProductosService) {}
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
    this.idProductosService.vaciarCarritoCompra();
  }

}