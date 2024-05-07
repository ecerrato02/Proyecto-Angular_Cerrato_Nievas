import {Component, OnInit} from '@angular/core';
import {RouterLinkActive, RouterOutlet} from "@angular/router";
import {IdProductosService} from "../id-productos.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-administrar-productos',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './administrar-productos.component.html',
  styleUrl: './administrar-productos.component.css'
})
export class AdministrarProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    this.http.get<any[]>('http://172.16.10.1:3080/api/llistatProductes').subscribe(
      (response: any[]) => {
        this.productos = response;
    }, error => {
        console.log('Error fetching productos:', error);
    });

  }

  ngOnInit() {
    this.obtenerProductos();
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
}
