import {Component, OnInit} from '@angular/core';
import {RouterLinkActive, RouterOutlet} from "@angular/router";
import {IdProductosService} from "../id-productos.service";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-administrar-productos',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './administrar-productos.component.html',
  styleUrl: './administrar-productos.component.css'
})
export class AdministrarProductosComponent implements OnInit {
  productos: any[] = [];
  pedidos: any[] = [];
  todosPedidos: any[] = [];
  totalGanado: any;

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    this.http.get<any[]>('http://localhost:3080/api/llistatProductes').subscribe(
      (response: any[]) => {
        this.productos = response;
    }, error => {
        console.log('Error fetching productos:', error);
    });

  }

  obtenerPedidos() {
    this.http.get<any[]>('http://localhost:3080/api/pedidos').subscribe(
      (response: any[]) => {
        this.pedidos = response;
    }, error => {
        console.log('Error fetching productos:', error);
    });
  }

  obtenerTodosPedidos() {
    this.http.get<any[]>('http://localhost:3080/api/todosPedidos').subscribe(
      (response: any[]) => {
        this.todosPedidos = response;
      }, error => {
        console.log('Error fetching productos:', error);
      });
  }

  obtenerTotalGanado() {
    this.http.get<any>('http://localhost:3080/api/totalGanado').subscribe(
      (response) => {
        this.totalGanado = response[0].totalSum;
      }, error => {
        console.log('Error fetching productos:', error);
      });
  }

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerPedidos();
    this.obtenerTodosPedidos();
    this.obtenerTotalGanado();
    const list = document.querySelectorAll(".navigation2 li");

    function activeLink(this: HTMLElement) {
      list.forEach((item: Element) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item: Element) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation2");
    const main = document.querySelector(".main");

    if (toggle instanceof HTMLElement && navigation instanceof HTMLElement && main instanceof HTMLElement) {
      toggle.onclick = function () {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      };
    }
  }

  protected readonly Number = Number;
}
