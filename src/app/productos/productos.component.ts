import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import { IdProductosService } from "../id-productos.service";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {productos} from "../bd/productos";
import { UsuariosService } from "../usuarios.service";
import {NgbRating, NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgOptimizedImage,
    RouterLink,
    NgbRating,
    NgStyle
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [NgbRatingConfig],
})
export class ProductosComponent implements OnInit {
  producto: any;
  mensajeError: string | null = null;
  plataformaSeleccionada = '';
  loggedIn = false;
  stockDisponible = false;
  agregadoCorrectamente = false;
  private arrayProductos: any;

  constructor(private route: ActivatedRoute, private router: Router, private idProductosService: IdProductosService, private segura: DomSanitizer, private usuariosService: UsuariosService, config: NgbRatingConfig, private http: HttpClient, private nav: NavComponent) {
    config.max = 5;
    config.readonly = true;
    this.usuariosService.loggedIn.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
    this.nav.comprobarCarrito();
  }

  sumar() {
    if (this.producto.cantidadProducto < this.producto.stock) {
      this.producto.cantidadProducto++;
    }
  }

  seleccionarPlataforma() {
    this.idProductosService.guardarPlataformaSeleccionada(this.plataformaSeleccionada);
  }

  irInicioSesion(){
    this.router.navigate(['/login']);
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
    this.agregadosCarritoLog(producto);
    this.idProductosService.actualizarNumeroDeProductosDiferentes();
    this.nav.comprobarCarrito();
    if (producto.stock > producto.cantidadProducto) {
      this.agregadoCorrectamente = this.idProductosService.agregadoCorrectamenteAlert();
      setTimeout(() => {
        this.agregadoCorrectamente = false
      }, 8000);
    }
  }

  agregadosCarritoLog(producto: productos){
    const logData = { username: sessionStorage.getItem("username"), information: "ha agregado x" + producto.cantidadProducto + " " + producto.nombreProducto + " a la cesta" };
    this.http.post<any>('http://172.16.10.1:3080/api/logs', logData).subscribe({});
  }



  getSafeUrl(url: string) {
    return this.segura.bypassSecurityTrustResourceUrl(url);
  }

  checkStock() {
    this.stockDisponible = this.producto.stock > 0;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productNameUrl = params.get('productNameUrl');
      if (productNameUrl) {
        this.idProductosService.cargarProductos();
        this.producto = this.idProductosService.obtenerProductoPorNombreUrl(productNameUrl);
        this.stockDisponible = this.producto.stock > 0;
        if (this.producto) {
          this.checkStock();
        } else {
          this.mensajeError = 'Producto no encontrado.';
        }
      } else {
        this.mensajeError = 'Nombre del producto no proporcionado en la URL.';
      }
    });
    this.http.get<any>('http://172.16.10.1:3080/api/llistatProductes').subscribe(
      (data: productos[]) => {
        this.arrayProductos = (Object.values(data));
        this.checkStock();
      },
      error => {
        console.log('Error fetching productos:', error);
      }
    );
  }

  protected readonly Number = Number;
  protected readonly sessionStorage = sessionStorage;
}
