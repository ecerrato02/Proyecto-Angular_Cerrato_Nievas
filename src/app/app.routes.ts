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
import {FinalizarCompraComponent} from "./finalizar-compra/finalizar-compra.component";
import {PasarelaPagoComponent} from "./pasarela-pago/pasarela-pago.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {ClaveProductoComponent} from "./clave-producto/clave-producto.component";
import {PaginaErrorComponent} from "./pagina-error/pagina-error.component";
import {PerfilComponent} from "./perfil/perfil.component";
import { RestablecerContrasenaComponent } from "./restablecer-contrasena/restablecer-contrasena.component";
import {AdministrarProductosComponent} from "./administrar-productos/administrar-productos.component";
import { AdminGuardService } from './admin-guard.service';
import {AdminVentasComponent} from "./admin-ventas/admin-ventas.component";
import { FormularioProductosComponent } from './formulario-productos/formulario-productos.component';
import {JuegosGratisComponent} from "./juegos-gratis/juegos-gratis.component";


export const routes: Routes = [
  {path: '', component:MenuComponent},
  {path: 'catalogo', component:CatalogoComponent},
  {path: 'juegos-gratis', component:JuegosGratisComponent},
  {path: 'condiciones', component:CondicionesComponent},
  {path: 'faq', component:FaqComponent},
  {path: 'carrito', component:CarritoComponent},
  {path: 'login', component:FormularioLoginComponent},
  {path: 'contacto', component:FormularioContactosComponent},
  {path: 'registro', component:FormularioRegistroComponent},
  {path: 'finalizar-compra', component:FinalizarCompraComponent},
  {path: 'pasarela-pago', component:PasarelaPagoComponent},
  {path: 'privacy', component:PrivacyPolicyComponent},
  {path: 'clave', component:ClaveProductoComponent},
  {path: 'perfil', component:PerfilComponent},
  {path: 'restablecer-contrasena', component:RestablecerContrasenaComponent},
  {path: 'restablecer-contrasena/:resetToken', component:RestablecerContrasenaComponent},
  {path: 'productos', component:FormularioProductosComponent, canActivate: [AdminGuardService]},
  {path: 'admin', component:AdministrarProductosComponent, canActivate: [AdminGuardService]},
  {path: '404', component:PaginaErrorComponent},
  {path: 'admin-ventas', component:AdminVentasComponent, canActivate: [AdminGuardService]},
  {path: ':productNameUrl', component:ProductosComponent},
  {path: '**', redirectTo: '/404'},

  //, canActivate: [AdminGuardService]
];
