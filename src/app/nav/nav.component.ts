import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {UsuariosService} from "../usuarios.service";


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

  constructor(private router: Router, private userService: UsuariosService) {}

  ngOnInit() {
    $(document).ready(function () {
      $('[data-bs-toggle="dropdown"]').dropdown();
    });
    this.userService.currentUsername.subscribe(username => this.username = username);
    this.userService.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  cerrarSesion(): void {
    this.userService.logout();
  }
}
