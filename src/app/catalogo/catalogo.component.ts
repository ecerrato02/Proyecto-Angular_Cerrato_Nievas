import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { Router } from '@angular/router';
import { IdProductosService } from "../id-productos.service";
import {FormsModule} from "@angular/forms";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgbPaginationModule
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})


export class CatalogoComponent implements OnInit{
  page = 1;

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

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
    if (!this.filtroBusqueda.trim()) {
      this.arrayProductos = [...this.todosLosProductos];
      return;
    }

    this.arrayProductos = this.todosLosProductos.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

}
