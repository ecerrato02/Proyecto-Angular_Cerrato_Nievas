import { Injectable } from '@angular/core';
import { productos } from "./bd/productos";

@Injectable({
  providedIn: 'root'
})
export class IdProductosService {
  private arrayProductos: productos[] = [];

  constructor() {
    this.cargarProductos();
  }

  private cargarProductos(){
    let productoUno = new productos(1, "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg", "Counter Strike 2", "Popular juego de disparos en primera persona enfocado en el combate táctico entre equipos", "Counter Strike 2 (CS2) es un popular videojuego de disparos en primera persona (FPS) desarrollado por Valve Corporation. Lanzado en 2012, es la cuarta entrega principal de la serie Counter-Strike. El juego enfrenta a dos equipos, terroristas y contraterroristas, en una serie de rondas con objetivos específicos como plantar o desactivar bombas. CS:GO es conocido por su enfoque en el juego estratégico, trabajo en equipo y habilidades individuales. Además del modo multijugador competitivo, incluye modos casuales y ofrece la posibilidad de personalizar armas y equipos. CS:GO se ha convertido en un título destacado en la escena de los deportes electrónicos (eSports).",1, 12.69, false, 0, false, true, false, false, false, false, false, "", "", "", "");
    let productoDos = new productos(2,"../assets/logo-BD.png", "CS3", "FPS", "", 2, 12.69, true, 0.2, true, false, false, false, false, false, false, "", "", "", "");
    let productoTres = new productos(3, "../assets/logo-BD.png", "CS4", "FPS", "", 3, 12.69, false, 0, true, false, false, false, false, false, false, "", "", "", "");
    let productoCuatro = new productos(4, "../assets/logo-BD.png", "CS5", "FPS", "", 3, 12.69, true, 0.45, false, false, false, false, false, false, false, "", "", "", "");
    let productoCinco = new productos(5, "../assets/logo-BD.png", "CS6", "FPS", "", 3, 12.69, false, 0, false, false, false, false, false, false, false, "", "", "", "");
    let productoSeis = new productos(6, "../assets/logo-BD.png", "CS7", "FPS", "", 2, 12.69, false, 0, false, false, false, false, false, false, false, "", "", "", "");
    let productoSiete = new productos(7, "../assets/logo-BD.png", "CS8", "FPS", "", 3, 12.69, false, 0, false, false, false, false, false, false, false, "", "", "", "");
    let productoOcho = new productos(8,"../assets/logo-BD.png", "CS9", "FPS", "", 1, 12.69, true, 0.1, false, false, false, false, false, false, false, "", "", "", "");

    // @ts-ignore
    this.arrayProductos.push(productoUno, productoDos, productoTres, productoCuatro, productoCinco, productoSeis, productoSiete, productoOcho);
  }

  obtenerProductos() {
    return this.arrayProductos;
  }
  obtenerProductoPorId(id: number) {
    return this.arrayProductos.find(p => p.idProducto === id);
  }
}
