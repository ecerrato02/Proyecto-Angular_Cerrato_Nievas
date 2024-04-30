import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {UsuariosService} from "../usuarios.service";
import {IdProductosService} from "../id-productos.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-finalizar-compra',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css'
})
export class FinalizarCompraComponent implements OnInit{
  tiempoEspera = 5;
  cargaEspera = true;
  username: string | null = "";


  constructor(private router: Router, private userService: UsuariosService, private idProductosService: IdProductosService, private http: HttpClient) {
    this.bajarTiempoEspera();
  }

  bajarTiempoEspera() {
    setTimeout(() => {
      if (this.tiempoEspera > 0) {
        this.tiempoEspera--;
        this.bajarTiempoEspera();
      } else {
        this.cargaEspera = false;
      }
    }, 1000);
    setTimeout(() => {
      this.obtenerClave()
    }, 10000);
  }


  obtenerClave(){
    this.router.navigate(['/clave']);
  }

  ngOnInit() {
    this.userService.currentUsername.subscribe(username => this.username = username);
  }

}
