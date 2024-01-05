import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import { CatalogoComponent } from "../catalogo/catalogo.component";
import { IdProductosService } from "../id-productos.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  producto: any;
  mensajeError: string | null = null;

  constructor(private route: ActivatedRoute, private idProductosService: IdProductosService) { }

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
}
