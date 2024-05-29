import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-juegos-gratis',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './juegos-gratis.component.html',
  styleUrls: ['./juegos-gratis.component.css']
})
export class JuegosGratisComponent {

  juegosPantalla: any[] = [];

  constructor(private router: Router, private http: HttpClient) {
    this.getJuegos();

  }

  async getJuegos(): Promise<void> {
    let contador = 0
    try {
      const response = await fetch('https://www.freetogame.com/api/games');
      const juegos = await response.json();
      let juego = 0;
      for (juego; juego < 100; juego++) {
        this.juegosPantalla[juego] = (juegos[juego])
        contador++
      }
    } catch (error) {
      console.error('Error fetching juegos: ', error);
    }
  }



  protected readonly Number = Number;


}
