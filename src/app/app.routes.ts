import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import {CondicionesComponent} from './condiciones/condiciones.component';
import {FaqComponent} from './faq/faq.component'
import {CarritoComponent} from './carrito/carrito.component';
import{ FormularioLoginComponent} from './formulario-login/formulario-login.component'
import{FormularioContactosComponent} from './formulario-contactos/formulario-contactos.component'
import{FormularioRegistroComponent} from './formulario-registro/formulario-registro.component'
import{ProductosComponent} from './productos/productos.component'
export const routes: Routes = [
  {path: '', component:MenuComponent},
  {path: 'catalogo', component:CatalogoComponent},
  {path: 'condiciones', component:CondicionesComponent},
  {path: 'faq', component:FaqComponent},
  {path: 'carrito', component:CarritoComponent},
  {path: 'formulario-login', component:FormularioLoginComponent},
  {path: 'formulario-contactos', component:FormularioContactosComponent},
  {path: 'formulario-registro', component:FormularioRegistroComponent},
  {path: 'productos', component:ProductosComponent},

];
