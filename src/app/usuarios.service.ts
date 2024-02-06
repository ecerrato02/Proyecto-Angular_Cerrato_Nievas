import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios: any[][]
  private usernameSource = new BehaviorSubject<string | null>(sessionStorage.getItem('username'));
  currentUsername = this.usernameSource.asObservable();

  private sessionStorageKey = 'productos';

  constructor() {
    const usuariosRegistrados = sessionStorage.getItem('usuarios')
    this.usuarios = usuariosRegistrados ? JSON.parse(usuariosRegistrados):[[],[]]
  }
  usuarioNuevo(username: string, password: string){
    this.usuarios[0].push(username)
    this.usuarios[1].push(password)
    sessionStorage.setItem('usuarios', JSON.stringify(this.usuarios))
    console.log(this.usuarios)
  }

  changeUsername(username: string | null) {
    this.usernameSource.next(username);
    if (username !== null) {
      sessionStorage.setItem('username', username);
    } else {
      sessionStorage.removeItem('username');
    }
  }

  login(username: string, password: string){
    for(let i = 0; i < this.usuarios[0].length; i++){
      if (this.usuarios [0][i] === username && this.usuarios [1][i] === password){
        sessionStorage.setItem('inicio', 'inicio correcto')
      }
    }
  }
  getProducts(): any[] {
    const productsJson = sessionStorage.getItem(this.sessionStorageKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  addProduct(product: any): void {
    const products = this.getProducts();
    products.push(product);
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(products));
  }
}
