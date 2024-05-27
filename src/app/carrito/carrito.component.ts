import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { IdProductosService } from "../id-productos.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { MetodoPagoService } from "../metodo-pago.service";
import {productos} from "../bd/productos";
import {HttpClient} from "@angular/common/http";
import {data} from "autoprefixer";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})

export class CarritoComponent implements OnInit, OnDestroy{
  animacionesEliminacion: { [idProducto: number]: boolean } = {};
  formularioCompleto: boolean = false;
  botonAgregarProducto: boolean = true;
  showMensajeProductoEliminado: boolean = false;
  mensajeProductoEliminado: string = "";
  precioeth: number = 0;
  preciobnb: number = 0;

  selectedPaymentMethod: string | null = null;

  pagarCrypto(moneda: string) {
    this.selectedPaymentMethod = moneda;
  }
  private intervalId: any;

  constructor(public idProductosService: IdProductosService, private router: Router, public MeotodPagoService: MetodoPagoService, private http: HttpClient) {
    this.idProductosService.actualizarNumeroDeProductosDiferentes();
    this.idProductosService.actualizarTotalCarrito();
    this.idProductosService.carritoEmpty();
    this.getPrecioeth();
    this.getPreciobtc();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  verificarCarritoVacio() {
    if (this.idProductosService.arrayCarrito.length === 0) {
      clearInterval(this.intervalId);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['carrito']);
      });
    }
  }

  ngOnInit() {
    this.idProductosService.cargarProductos();
    let arrayCarrito = this.idProductosService.arrayCarrito;
    arrayCarrito.forEach(productos => {
      this.productoSinStockQuitarCarrito(productos.idProducto);
    })

    if (this.idProductosService.carritoState) {
      this.intervalId = setInterval(() => {
        this.verificarCarritoVacio();
      }, 5000);
    }
    setInterval(() => {
      this.getPreciobtc();
      this.getPrecioeth();
    }, 60000);
  }

  pagarTarjeta() {
    this.selectedPaymentMethod = 'Tarjeta';
    this.MeotodPagoService.pagoTarjeta();
  }

  pagarPayPal() {
    this.selectedPaymentMethod = 'PayPal';
    this.MeotodPagoService.pagoPayPal();
  }

  verificarFormulario() {
    const campos = document.querySelectorAll('input[required]');
    const camposArray = Array.from(campos);

    let formularioValido = true;

    camposArray.forEach((campo: Element) => {
      if (campo instanceof HTMLInputElement && !campo.value.trim()) {
        formularioValido = false;
      }
    });

    this.formularioCompleto = formularioValido;
  }

  eliminarUnaUnidad(idProducto: number) {
    this.idProductosService.eliminarUnaUnidadCarrito(idProducto);
    const index = this.idProductosService.arrayCarrito.findIndex(p => p.idProducto === idProducto);
    const productoAgregado = this.idProductosService.arrayCarrito[index];

    if(productoAgregado.stock > productoAgregado.cantidadProducto) {
      this.botonAgregarProducto = true;
    }
  }

  agregarUnaUnidad(idProducto: number) {
    const index = this.idProductosService.arrayCarrito.findIndex(p => p.idProducto === idProducto);
    const productoAgregado = this.idProductosService.arrayCarrito[index];

    if(productoAgregado.stock > productoAgregado.cantidadProducto) {
      this.idProductosService.agregarUnaUnidadCarrito(idProducto);
      this.idProductosService.actualizarTotalCarrito();
      this.unoAgregadoLog(productoAgregado);
    } else if (productoAgregado.stock === productoAgregado.cantidadProducto){
      this.botonAgregarProducto = false;
    }
  }

  productoSinStockQuitarCarrito(idProducto: number) {
    const index = this.idProductosService.arrayCarrito.findIndex(p => p.idProducto === idProducto);
    const producto = this.idProductosService.arrayCarrito[index];

    if(producto.stock === 0) {
      this.eliminarTodasUnidades(idProducto);
      this.mensajeProductoEliminado = "¡Se ha eliminado " + producto.nombreProducto + " del carrito debido a que no hay stock suficiente!"
      this.showMensajeProductoEliminado = true;
      setTimeout( () => {
        this.showMensajeProductoEliminado = false;
      }, 5000)
    } else if (producto.stock < producto.cantidadProducto) {
      producto.cantidadProducto = producto.stock;
    }
  }

  eliminarTodasUnidades(idProducto: number) {
    const index = this.idProductosService.arrayCarrito.findIndex(p => p.idProducto === idProducto);

    if (index !== -1) {
      this.animacionesEliminacion[idProducto] = true;

      setTimeout(() => {
        const productoEliminado = this.idProductosService.arrayCarrito[index];
        this.idProductosService.arrayCarrito.splice(index, 1);
        delete this.animacionesEliminacion[idProducto];
        this.idProductosService.actualizarTotalCarrito();
        this.idProductosService.numeroDeProductosDiferentes = this.idProductosService.numeroDeProductosDiferentes - 1;
        this.idProductosService.actualizarNumeroDeProductosDiferentes();
        this.eliminadosCarritoLog(productoEliminado);
        this.idProductosService.guardarCarritoEnLocalStorage();
      }, 1000);

      if (this.idProductosService.arrayCarrito.length == 0) {
        this.idProductosService.carritoState = false;
      }
    }
  }

  eliminadosCarritoLog(productoEliminado: any) {
    const logData = {
      username: sessionStorage.getItem("username"),
      information: "ha eliminado x" + productoEliminado.cantidadProducto + " " + productoEliminado.nombreProducto + " de la cesta"
    };
    this.http.post<any>('http://172.16.10.1:3080/api/logs', logData).subscribe({});
  }

  unoEliminadoLog(productoEliminado: any) {
    const logData = {
      username: sessionStorage.getItem(""),
      information: "ha eliminado x1 " + productoEliminado.nombreProducto + " de la cesta"
    };
    this.http.post<any>('http://172.16.10.1:3080/api/logs', logData).subscribe({});
  }

  unoAgregadoLog(productoEliminado: any) {
    const logData = {
      username: sessionStorage.getItem("username"),
      information: "ha añadido x1 " + productoEliminado.nombreProducto + " a la cesta"
    };
    this.http.post<any>('http://172.16.10.1:3080/api/logs', logData).subscribe({});
  }

  finalizarCompra() {
    this.router.navigate(['/pasarela-pago']);
  }
  async getPrecioeth(): Promise<void> {

    let response = null;
    try {
      response = await fetch('https://api.coingecko.com/api/v3/coins/ethereum');
      const precio = await response.json();
      this.precioeth = this.idProductosService.totalCarrito / precio.market_data.current_price.eur
    }catch (error) {
      console.error('Error fetching precio: ', error);
    }
  }

  async getPreciobtc(): Promise<void> {

    let response = null;
    try {
      response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
      const precio = await response.json();
      this.preciobnb = this.idProductosService.totalCarrito / precio.market_data.current_price.eur

    }catch (error) {
      console.error('Error fetching precio: ', error);
    }
  }

  protected readonly Number = Number;
  protected readonly sessionStorage = sessionStorage;
}
