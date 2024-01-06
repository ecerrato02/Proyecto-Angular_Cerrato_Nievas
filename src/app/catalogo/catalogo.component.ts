import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { productos } from '../bd/productos';
import { Router } from '@angular/router';
import { ProductosComponent } from "../productos/productos.component";
import { IdProductosService } from "../id-productos.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})


export class CatalogoComponent {
  arrayProductos: any[] = [];
  todosLosProductos: any[] = [];

  constructor(private idProductosService: IdProductosService, private router: Router) { }

  ngOnInit() {
    this.todosLosProductos = this.idProductosService.obtenerProductos();
    this.arrayProductos = [...this.todosLosProductos];
  }

  verDetalleProducto(id: number) {
    this.router.navigate(['/productos', id]).then(r => '/catalogo');
  }

  filtrado() {
    const catSeleccion = document.getElementById("filtro-cat") as HTMLSelectElement;
    const valSeleccion = catSeleccion.value;

    if (valSeleccion !== '0') {
      this.arrayProductos = this.todosLosProductos.filter(producto => producto.categoriaProducto == valSeleccion);
    } else {
      this.arrayProductos = [...this.todosLosProductos];
    }
  }

  protected readonly Math = Math;
  protected readonly Number = Number;

  filtroBusqueda: string = '';
  filtrarProductos() {
    // Si el valor de búsqueda está vacío, mostrar todos los productos
    if (!this.filtroBusqueda.trim()) {
      this.arrayProductos = [...this.todosLosProductos];
      return;
    }

    // Lógica para filtrar productos según la cadena de búsqueda
    this.arrayProductos = this.todosLosProductos.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

}
