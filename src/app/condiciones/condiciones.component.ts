import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-condiciones',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './condiciones.component.html',
  styleUrl: './condiciones.component.css'
})
export class CondicionesComponent {

}
