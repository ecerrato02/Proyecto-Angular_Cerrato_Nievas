import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";


interface CEO {
  id: string;
  imgUrl: string;
  alt: string;
  nombre: string;
  cargo: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  ceos: CEO[] = [
    { id: 'edu-nievas', imgUrl: 'http://172.16.10.1:3080/imagenes/profile.png', alt: 'Edu', nombre: 'Edu Nievas', cargo: 'CEO y Programador Web' },
    { id: 'eduardo', imgUrl: 'http://172.16.10.1:3080/imagenes/profile.png', alt: 'Eduardo', nombre: 'Eduardo Cerrato', cargo: 'CEO y Programador Web' },
    { id: 'luis', imgUrl: 'http://172.16.10.1:3080/imagenes/luis.jpg', alt: 'Luis', nombre: 'Luis', cargo: 'D.E.P.'}
  ];

}
