import { Injectable } from '@angular/core';
import { productos } from "./bd/productos";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProductosComponent} from "./productos/productos.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IdProductosService {
  arrayProductos: any[] = [];
  arrayCarrito: productos[] = [];
  totalCarrito = 0;
  carritoState: boolean = true;
  carritoProductoSinStock: boolean = false;
  numeroDeProductosDiferentes = 0;
  plataformaSeleccionada = "";
  nombreProductos: string[] = [];
  abecedario: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];

  private carritoStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public carritoState$ = this.carritoStateSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.cargarProductos();
    this.cargarCarritoDesdeLocalStorage();
  }

  cargarProductos(){
    this.http.get<any[]>('http://172.16.10.1:3080/api/llistatProductes').subscribe((data) => {
        this.arrayProductos = Object.values(data);
        this.arrayCarrito.forEach((itemCarrito) => {
          const productoEncontrado = this.arrayProductos.find((producto) => producto.idProducto === itemCarrito.idProducto);
          if (productoEncontrado) {
            itemCarrito.stock = productoEncontrado.stock;
          }
        });
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }


  cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.arrayCarrito = JSON.parse(carritoGuardado);
      this.actualizarNumeroDeProductosDiferentes();
    }
  }


  guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.arrayCarrito));
  }

  obtenerProductos() {
    return this.arrayProductos;
  }

  guardarPlataformaSeleccionada(plataforma: string) {
    this.plataformaSeleccionada = plataforma;
  }

  obtenerProductoPorId(id: number) {
    return this.arrayProductos.find(idDelProducto => idDelProducto.idProducto === id);
  }

  obtenerProductoPorNombreUrl(productNameUrl: string) {
    const productoGuardado = localStorage.getItem('producto_' + productNameUrl);
    if (productoGuardado) {
      return JSON.parse(productoGuardado);
    } else {
      return this.arrayProductos.find(producto => producto.productNameUrl === productNameUrl);
    }
  }

  actualizarTotalCarrito() {
    this.totalCarrito = this.arrayCarrito.reduce((total, item) => {
      return total + (item.precioProducto * item.cantidadProducto);
    }, 0);
  }

  obtenerProductosEnCesta() {
    return this.arrayCarrito;
  }

  actualizarNumeroDeProductosDiferentes() {
    this.numeroDeProductosDiferentes = this.arrayCarrito.length;
    this.actualizarTotalCarrito();
  }

  agregadoCorrectamenteAlert() {
    return true;
  }

  agregarAlCarrito(producto: productos): void {
    const productoEncontrado = this.arrayCarrito.find(productoCarrito => productoCarrito.idProducto === producto.idProducto);

    let productoParaCarrito = { ...producto };

    if (productoParaCarrito.descuentoProducto) {
      productoParaCarrito.precioProducto -= productoParaCarrito.precioProducto * productoParaCarrito.porcentajeDescuentoProducto;
    }

    if(productoParaCarrito.cantidadProducto <= productoParaCarrito.stock) {
      if (productoEncontrado) {
        productoEncontrado.cantidadProducto += productoParaCarrito.cantidadProducto;
      } else {
        productoParaCarrito.claves = [];
        for (let i = 0; i < productoParaCarrito.cantidadProducto; i++) {
          productoParaCarrito.claves.push(this.generarClaveProducto());
        }
        this.arrayCarrito.push(productoParaCarrito);
      }
      this.guardarCarritoEnLocalStorage();
    }
  }

  generarClaveProducto() {
    let claveProducto = "";
    for (let i = 0; i < 25; i++) {
      let numeroAleatorio = this.generarNumeroAleatorio();
      let valor = this.abecedario[numeroAleatorio];

      claveProducto += valor;

      if ((i + 1) % 5 === 0 && i !== 24) {
        claveProducto += '-';
      }
    }
    return claveProducto;
  }

  generarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 35);
  }

  eliminarUnaUnidadCarrito(idProducto: number) {
    const index = this.arrayCarrito.findIndex(productoCarrito => productoCarrito.idProducto === idProducto);
    if (index !== -1) {
      if (this.arrayCarrito[index].cantidadProducto > 1) {
        this.arrayCarrito[index].cantidadProducto--;
      } else {
        this.arrayCarrito.splice(index, 1);
      }
      this.guardarCarritoEnLocalStorage();
      this.actualizarTotalCarrito();
      this.actualizarNumeroDeProductosDiferentes();
    }
  }

  agregarUnaUnidadCarrito(idProducto: number) {
    const productoCompleto = this.obtenerProductoPorId(idProducto);
    if (productoCompleto) {
      const index = this.arrayCarrito.findIndex(p => p.idProducto === idProducto);
      if (index !== -1) {
        this.arrayCarrito[index].cantidadProducto++;
      } else {
        const productoParaAgregar = { ...productoCompleto };
        productoParaAgregar.cantidadProducto = 1;
        this.arrayCarrito.push(productoParaAgregar);
      }
      this.guardarCarritoEnLocalStorage();
      this.actualizarTotalCarrito();
      this.actualizarNumeroDeProductosDiferentes();
    }
  }


  vaciarCarritoCompra(){
    this.vaciarCarrito();
    this.actualizarTotalCarrito();
    this.numeroDeProductosDiferentes = this.numeroDeProductosDiferentes - 1;
    this.actualizarNumeroDeProductosDiferentes();
    localStorage.removeItem('carrito');
  }

 claveProducto(){
   this.router.navigate(['/finalizar-compra']);
 }

  carritoEmpty(){
    if(this.arrayCarrito.length > 0){
      this.carritoState = true;
      this.carritoStateSubject.next(true);
    } else if (this.arrayCarrito.length <= 0){
      this.carritoState = false;
      this.carritoStateSubject.next(false);
    }
  }

  vaciarCarrito() {
    this.arrayCarrito = [];
    localStorage.removeItem('carrito');
    this.carritoEmpty();
  }
}
