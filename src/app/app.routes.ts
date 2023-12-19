import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import {CondicionesComponent} from './condiciones/condiciones.component';
import {FaqComponent} from './faq/faq.component'
import {CarritoComponent} from './carrito/carrito.component';
export const routes: Routes = [
  {path: '', component:MenuComponent},
  {path: 'catalogo', component:CatalogoComponent},
  {path: 'condiciones', component:CondicionesComponent},
  {path: 'faq', component:FaqComponent},
  {path: 'carrito', component:CarritoComponent},

];
