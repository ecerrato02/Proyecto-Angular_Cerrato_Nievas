import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
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
    NgbRating
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [NgbRatingConfig],
})
export class ProductosComponent implements OnInit {
  producto: any;
  mensajeError: string | null = null;
  agregadoCorrectamente = false;
  plataformaSeleccionada = '';
  loggedIn = false;

  constructor(private route: ActivatedRoute, private router: Router, private idProductosService: IdProductosService, private segura: DomSanitizer, private usuariosService: UsuariosService, config: NgbRatingConfig, private http: HttpClient, private nav: NavComponent) {
    config.max = 5;
    config.readonly = true;
    this.usuariosService.loggedIn.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
    this.nav.comprobarCarrito();
  }

  sumar() {
    if (this.producto.cantidadProducto < 50) {
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
    this.agregadoCorrectamente = true;
    this.agregadosCarritoLog(producto);
    this.idProductosService.actualizarNumeroDeProductosDiferentes();
    this.nav.comprobarCarrito();
    setTimeout(() => {
      this.agregadoCorrectamente = false;
    }, 5000);
  }

  agregadosCarritoLog(producto: productos){
    const logData = { username: sessionStorage.getItem("username"), information: "ha agregado x" + producto.cantidadProducto + " " + producto.nombreProducto + " a la cesta" };
    this.http.post<any>('http://localhost:3080/api/logs', logData).subscribe({});
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
