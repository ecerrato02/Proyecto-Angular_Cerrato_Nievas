import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { productos } from '../bd/productos';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})


export class CatalogoComponent {
  arrayProductos: any[] = [];
  cargarProductos(){
    let productoUno = new productos(1, "../assets/logo-BD.png", "CS2", "Popular juego de disparos en primera persona enfocado en el combate táctico entre equipos", 1, 12.69, false, 0);
    let productoDos = new productos(2,"../assets/logo-BD.png", "CS3", "FPS", 2, 12.69, true, 0.2);
    let productoTres = new productos(3, "../assets/logo-BD.png", "CS4", "FPS", 3, 12.69, false, 0);
    let productoCuatro = new productos(4, "../assets/logo-BD.png", "CS5", "FPS", 3, 12.69, true, 0.45);
    let productoCinco = new productos(5, "../assets/logo-BD.png", "CS6", "FPS", 3, 12.69, false, 0);
    let productoSeis = new productos(6, "../assets/logo-BD.png", "CS7", "FPS", 2, 12.69, false, 0);
    let productoSiete = new productos(7, "../assets/logo-BD.png", "CS8", "FPS", 3, 12.69, false, 0);
    let productoOcho = new productos(8,"../assets/logo-BD.png", "CS9", "FPS", 1, 12.69, true, 0.1);

    // @ts-ignore
    this.arrayProductos.push(productoUno, productoDos, productoTres, productoCuatro, productoCinco, productoSeis, productoSiete, productoOcho);
  }

  filtrado(){
    const catSeleccion = document.getElementById("filtro-cat") as HTMLSelectElement;
    const valSeleccion = catSeleccion.value;
    if (valSeleccion !== '0'){
      this.arrayProductos = [];
      this.cargarProductos();
      this.arrayProductos = this.arrayProductos.filter(productos => productos.categoriaProducto == valSeleccion);
    } else {
      this.arrayProductos = [];
      this.cargarProductos();
    }
  }

  ngOnInit(){
    this.cargarProductos();
  }

  protected readonly Math = Math;
  protected readonly Number = Number;
}
