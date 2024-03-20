import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";


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
        NgForOf,
        NgbTooltip
    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  ceos: CEO[] = [
    { id: 'edu-nievas', imgUrl: 'assets/profile.png', alt: 'Edu', nombre: 'Edu Nievas', cargo: 'CEO y Programador Web' },
    { id: 'eduardo', imgUrl: 'assets/profile.png', alt: 'Eduardo', nombre: 'Eduardo Cerrato', cargo: 'CEO y Programador Web' },
    { id: 'luis', imgUrl: 'assets/luis.jpg', alt: 'Luis', nombre: 'Luis', cargo: 'D.E.P.'}
  ];

}
