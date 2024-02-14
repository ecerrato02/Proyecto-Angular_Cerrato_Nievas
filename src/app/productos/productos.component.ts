import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import { IdProductosService } from "../id-productos.service";
import {ActivatedRoute, RouterLink} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {productos} from "../bd/productos";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  producto: any;
  mensajeError: string | null = null;
  agregadoCorrectamente = false;
  plataformaSeleccionada = '';

  constructor(private route: ActivatedRoute, private idProductosService: IdProductosService, private segura: DomSanitizer) {}

  sumar() {
    if (this.producto.cantidadProducto < 50) {
      this.producto.cantidadProducto++;
    }
  }

  seleccionarPlataforma() {
    this.idProductosService.guardarPlataformaSeleccionada(this.plataformaSeleccionada);
  }

  restar() {
    if (this.producto.cantidadProducto > 1) {
      this.producto.cantidadProducto--;
    }
  }

  validarCantidad() {
    if (this.producto.cantidadProducto < 1) {
      this.producto.cantidadProducto = 1;
    } else if (this.producto.cantidadProducto > 50) {
      this.producto.cantidadProducto = 50;
    }
  }

  agregarProductoAlCarrito(producto: productos) {
    this.idProductosService.agregarAlCarrito(producto);
    this.agregadoCorrectamente = true;
    setTimeout(() => {
      this.agregadoCorrectamente = false;
    }, 5000);
  }



  getSafeUrl(url: string) {
    return this.segura.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idProducto = params.get('id');
      if (idProducto !== null) {
        this.producto = this.idProductosService.obtenerProductoPorId(Number(idProducto));
        this.idProductosService.nombreProductos = this.producto.nombreProducto;
      } else {
        this.mensajeError = "Producto no encontrado.";
        this.producto = null;
      }
    });
  }

  protected readonly Number = Number;
  protected readonly sessionStorage = sessionStorage;
}
