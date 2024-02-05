import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import { CatalogoComponent } from "../catalogo/catalogo.component";
import { IdProductosService } from "../id-productos.service";
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {productos} from "../bd/productos";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  producto: any;
  mensajeError: string | null = null;
  agregadoCorrectamente = false;

  constructor(private route: ActivatedRoute, private idProductosService: IdProductosService, private segura: DomSanitizer) { }

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
      } else {
        this.mensajeError = "Producto no encontrado.";
        this.producto = null;
      }
    });

  }

  protected readonly Number = Number;
}
