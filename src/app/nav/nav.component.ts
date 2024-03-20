import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {UsuariosService} from "../usuarios.service";
import {HttpClient} from "@angular/common/http";
import { IdProductosService } from "../id-productos.service";


declare const $: any;

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  username: string | null = null;
  loggedIn: boolean = false;
  carritoVacio: boolean = true;

  constructor(private router: Router, private userService: UsuariosService, private http: HttpClient, public idProductosService: IdProductosService) {}

  ngOnInit() {
    $(document).ready(function () {
      $('[data-bs-toggle="dropdown"]').dropdown();
    });
    this.userService.currentUsername.subscribe(username => this.username = username);
    this.userService.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.comprobarCarrito();
  }

  comprobarCarrito() {
    if (this.idProductosService.numeroDeProductosDiferentes > 0){
      this.carritoVacio = false;
    } else if (this.idProductosService.numeroDeProductosDiferentes === 0){
      this.carritoVacio = true;
    }
  }

  cerrarSesion() {
    this.logoutLog()
    this.userService.logout();
  }

  logoutLog(){
    const logData = { username: sessionStorage.getItem("username"), information: "ha cerrado sesión" };
    this.http.post<any>('http://172.16.10.1:3080/api/logs', logData).subscribe({});
  }
}
