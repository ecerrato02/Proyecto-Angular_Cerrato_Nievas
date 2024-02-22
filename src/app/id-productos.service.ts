import { Injectable } from '@angular/core';
import { productos } from "./bd/productos";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IdProductosService {
  private arrayProductos: productos[] = [];
  arrayCarrito: productos[] = [];
  totalCarrito = 0;
  carritoState: boolean = true;
  numeroDeProductosDiferentes = 0;
  plataformaSeleccionada = "";
  nombreProductos: string[] = [];
  abecedario: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];

  constructor(private router: Router) {
    this.cargarProductos();
    this.cargarCarritoDesdeLocalStorage();
  }

  private cargarProductos(){
    let productoUno = new productos(1, "counter-strike", "/assets/cs2.jpg", "Counter Strike 2", "Popular juego de disparos en primera persona enfocado en el combate táctico entre equipos", "Counter Strike 2 (CS2) es un popular videojuego de disparos en primera persona (FPS) desarrollado por Valve Corporation. Lanzado en 2012, es la cuarta entrega principal de la serie Counter-Strike. El juego enfrenta a dos equipos, terroristas y contraterroristas, en una serie de rondas con objetivos específicos como plantar o desactivar bombas. CS:GO es conocido por su enfoque en el juego estratégico, trabajo en equipo y habilidades individuales. Además del modo multijugador competitivo, incluye modos casuales y ofrece la posibilidad de personalizar armas y equipos. CS:GO se ha convertido en un título destacado en la escena de los deportes electrónicos (eSports).",1, 12.69, false, 0, "Windows 10/11 o Ubuntu 20.04.", "CPU de 4 subprocesos - Intel® Core™ i5 750 o superior.", "8 GB de RAM.", "La tarjeta gráfica de ser de al menos 1 GB y debe ser compatible con DirectX 11 y Shader Model 5.0.", false, true, false, false, false, false, false, "", "", "", "", "https://www.youtube.com/embed/dgirAxkjeNQ?si=-eGYfp2kG1Y1iW_x", 1, "");
    let productoDos = new productos(2, "ark", "/assets/ark.jpg", "ARK: Survival Evolved", "ARK: Survival Evolved es un videojuego de supervivencia y aventura en un mundo con dinosaurios, donde los jugadores recolectan recursos, construyen bases y doman criaturas.", "ARK: Survival Evolved es un videojuego de acción-aventura y supervivencia desarrollado por Studio Wildcard. Lanzado en 2017, el juego se sitúa en un mundo abierto donde los jugadores deben sobrevivir en un entorno hostil lleno de dinosaurios y otras criaturas prehistóricas y míticas. Los jugadores comienzan con nada y deben recolectar recursos, fabricar herramientas, construir refugios y cazar o domesticar animales para sobrevivir. Una de las características más distintivas del juego es la capacidad de domesticar y montar dinosaurios y otras criaturas, lo que añade un aspecto único a la jugabilidad. El juego se puede jugar tanto en modo solo como en multijugador, donde los jugadores pueden colaborar o competir entre sí. \"ARK: Survival Evolved\" también incluye elementos de construcción de bases y defensa, así como un sistema de niveles y habilidades que permite a los jugadores mejorar sus personajes y construcciones. Además, el juego se ha expandido con varios paquetes de expansión que añaden nuevos mapas, criaturas y mecánicas de juego, aumentando así la riqueza y la complejidad del mundo de ARK.", 2, 14.84, true, 0.1, "Windows 7 (64-bit).", "Intel Core i5-2400/AMD FX-8320 o superior.", "8GB de RAM.", "NVIDIA GTX 670 2GB/AMD Radeon HD 7870 2GB o superior.", false, true, false, false, true, true, true, "", "", "", "", "https://www.youtube.com/embed/5fIAPcVdZO8?si=6_JU5Xnld7V0sEOf", 1, "");
    let productoTres = new productos(3, "escape-from-tarkov", "/assets/tarkov.jpg", "Escape from Tarkov", "Escape from Tarkov es un juego de disparos táctico y de supervivencia, con un enfoque realista. Los jugadores deben luchar, saquear y sobrevivir en un entorno hostil y desafiante, enfrentando a otros jugadores y a enemigos controlados por IA.", "Escape from Tarkov es un videojuego de disparos en primera persona (FPS) desarrollado por Battlestate Games. Fue lanzado en forma de beta cerrada en 2016 y ha ganado popularidad debido a su enfoque en la simulación y realismo. El juego se desarrolla en la ficticia ciudad rusa de Tarkov, que ha sido devastada por la guerra y está rodeada por fuerzas militares hostiles. El principal atractivo de Escape from Tarkov es su combinación única de elementos de shooter táctico, supervivencia y juego de rol. Los jugadores asumen el papel de mercenarios que buscan sobrevivir y escapar de Tarkov, mientras enfrentan a enemigos controlados por la inteligencia artificial y a otros jugadores en un entorno PvPvE (jugadores contra jugadores y entorno). El juego se caracteriza por su sistema de loot, donde los jugadores pueden saquear edificios y cuerpos de enemigos para obtener equipo, armas y suministros. Además, cuenta con un sistema de progresión del personaje, que incluye habilidades y mejoras a medida que los jugadores ganan experiencia. Escape from Tarkov destaca por su realismo en términos de mecánicas de armas, daño y heridas, así como por la necesidad de gestionar cuidadosamente recursos como la salud, la hidratación y la energía. La muerte permanente de personajes y la pérdida de equipo en caso de fracaso en la misión añaden un nivel adicional de tensión y estrategia al juego.", 1, 49.99, true, 0.08, "Windows 7 (64bit).", "Dual-core (Intel Core 2 Duo, i3) / (AMD Athlon, Phenom II).", "6GB.", "DX9 compatible graphics card with 1GB memory.", false, true, false, false, false, false, false, "", "", "", "", "https://www.youtube.com/embed/MyUQsh0UCZI?si=QCt_FBIKa6DVHgr4", 1, "");
    let productoCuatro = new productos(4, "prueba1", "../assets/logo-BD.png", "CS5", "FPS", "", 2, 12.69, true, 0.45, "", "", "", "",false, false, false, false, false, false, false, "", "", "", "", "", 1, "");
    let productoCinco = new productos(5, "prueba2", "../assets/logo-BD.png", "CS6", "FPS", "", 3, 12.69, false, 0, "", "", "", "",false, false, false, false, false, false, false, "", "", "", "", "", 1, "");
    let productoSeis = new productos(6, "rust", "/assets/rust.jpg", "Rust", "Rust es un juego de supervivencia multijugador donde los jugadores recolectan recursos y construyen bases, enfrentándose a desafíos ambientales y a otros jugadores en un mundo abierto", "Rust es un videojuego de supervivencia multijugador desarrollado y publicado por Facepunch Studios, lanzado inicialmente en acceso anticipado en 2013 y con su versión completa en 2018. En Rust, los jugadores comienzan desnudos en un mundo abierto, típicamente una isla, con el objetivo de sobrevivir lo máximo posible. Esto implica recolectar recursos, como comida y materiales para construir, mientras interactúan con otros jugadores. El juego es conocido por su dificultad y su enfoque en la interacción entre jugadores, que puede incluir alianzas o conflictos. Los elementos de supervivencia son clave, con jugadores que deben gestionar su salud, hambre y sed, así como protegerse de los peligros del entorno y de otros jugadores. El crafting es un componente esencial, permitiendo a los jugadores construir herramientas, armas y bases. La tensión y la incertidumbre son elementos centrales de Rust, ya que los jugadores pueden ser amigos o enemigos, y la pérdida de recursos y progreso al morir añade una dimensión de riesgo y estrategia al juego. La experiencia en Rust puede variar enormemente, desde la construcción y cooperación pacífica hasta conflictos intensos y traiciones.", 2, 39.99, false, 0, "Windows 10 (64bit).", "Intel Core i7-3770/AMD FX-9590 o superior.", "10GB de RAM.", "GTX 670 2GB / AMD R9 280 o superior.",true, true, false, false, false, false, false, "Windows 11 (64bit).", "Intel Core i7-4790K / AMD Ryzen 5 1600", "16GB de RAM.", "GTX 980 / AMD R9 Fury", "https://www.youtube.com/embed/LGcECozNXEw?si=Cv6dl7nnAbJrdj0S", 1, "");
    let productoSiete = new productos(7, "prueba3", "../assets/logo-BD.png", "CS8", "FPS", "", 3, 12.69, false, 0, "", "", "", "",false, false, false, false, false, false, false, "", "", "", "", "", 1, "");
    let productoOcho = new productos(8, "rainbow-six-siege", "/assets/r6.jpg", "Tom Clancy's Rainbow Six Siege", "Rainbow Six Siege es un juego táctico de disparos en primera persona de Ubisoft, lanzado en 2015, donde jugadores asumen roles de operadores antiterroristas en enfrentamientos estratégicos entre atacantes y defensores.", "Tom Clancy's Rainbow Six Siege es un videojuego de disparos en primera persona táctico desarrollado por Ubisoft. Lanzado por primera vez en 2015, el juego pone un fuerte énfasis en la cooperación y la destrucción del entorno. Se centra en enfrentamientos entre atacantes y defensores, ofreciendo una experiencia intensa y estratégica. Los jugadores asumen el rol de operadores de diferentes unidades antiterroristas de todo el mundo, cada uno con sus habilidades, armas y dispositivos únicos. Los modos de juego incluyen asegurar un área, desactivar una bomba o rescatar rehenes. La planificación, el trabajo en equipo y el conocimiento del entorno son cruciales para el éxito en Rainbow Six Siege, donde la estrategia y la comunicación efectiva son tan importantes como la habilidad en los disparos.", 1, 9.54, false, 0.0, "Windows 7 (64bit).", "Intel Core i3 560 / AMD Phenom II X4 945 o superior.", "6GB RAM.", "NVIDIA GeForce GTX 460 / AMD Radeon HD 5870 (DirectX-11 compliant con 1GB de VRAM).",true, true, true, false, true, true, true, "Windows 7 SP1/8.1/10 (64bit).", "Intel Core i5-2500K / AMD FX-8120 o superior", "8GB RAM.", "NVIDIA GeForce GTX 670 (GTX 760 / GTX 960) / AMD Radeon HD 7970 (or R9 280x [2GB VRAM] / R9 380 / Fury X).", "https://www.youtube.com/embed/cnZ8yb-9B7E?si=3u9VOCa7nkX0RbOT", 1, "");

    // @ts-ignore
    this.arrayProductos.push(productoUno, productoDos, productoTres, productoCuatro, productoCinco, productoSeis, productoSiete, productoOcho);
  }


  cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.arrayCarrito = JSON.parse(carritoGuardado);
      this.actualizarNumeroDeProductosDiferentes();
    }
  }

  guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.arrayCarrito));
  }

  obtenerProductos() {
    return this.arrayProductos;
  }

  guardarPlataformaSeleccionada(plataforma: string) {
    this.plataformaSeleccionada = plataforma;
  }

  obtenerProductoPorId(id: number) {
    return this.arrayProductos.find(idDelProducto => idDelProducto.idProducto === id);
  }

  actualizarTotalCarrito() {
    this.totalCarrito = this.arrayCarrito.reduce((total, item) => {
      return total + (item.precioProducto * item.cantidadProducto);
    }, 0);
  }

  obtenerProductosEnCesta() {
    return this.arrayCarrito;
  }

  actualizarNumeroDeProductosDiferentes() {
    this.numeroDeProductosDiferentes = this.arrayCarrito.length;
    this.actualizarTotalCarrito();
  }

  agregarAlCarrito(producto: productos): void {
    const productoEncontrado = this.arrayCarrito.find(productoCarrito => productoCarrito.idProducto === producto.idProducto);

    let productoParaCarrito = { ...producto };

    if (productoParaCarrito.descuentoProducto) {
      productoParaCarrito.precioProducto -= productoParaCarrito.precioProducto * productoParaCarrito.porcentajeDescuentoProducto;
    }

    if (productoEncontrado) {
      productoEncontrado.cantidadProducto += productoParaCarrito.cantidadProducto;
    } else {
      productoParaCarrito.claves = [];
      for (let i = 0; i < productoParaCarrito.cantidadProducto; i++) {
        productoParaCarrito.claves.push(this.generarClaveProducto());
      }
      this.arrayCarrito.push(productoParaCarrito);
    }
    this.guardarCarritoEnLocalStorage()
  }

  generarClaveProducto(): string {
    let claveProducto = "";
    for (let i = 0; i < 25; i++) {
      let numeroAleatorio = this.generarNumeroAleatorio();
      let valor = this.abecedario[numeroAleatorio];

      claveProducto += valor;

      if ((i + 1) % 5 === 0 && i !== 24) {
        claveProducto += '-';
      }
    }
    return claveProducto;
  }

  generarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 35);
  }

  eliminarUnaUnidadCarrito(idProducto: number) {
    const index = this.arrayCarrito.findIndex(productoCarrito => productoCarrito.idProducto === idProducto);
    if (index !== -1) {
      if (this.arrayCarrito[index].cantidadProducto > 1) {
        this.arrayCarrito[index].cantidadProducto--;
      } else {
        this.arrayCarrito.splice(index, 1);
      }
    }
  }

  agregarUnaUnidadCarrito(idProducto: number, cantidad: number) {
    const productoCompleto = this.obtenerProductoPorId(idProducto);
    if (productoCompleto) {
      productoCompleto.cantidadProducto = cantidad;
      this.agregarAlCarrito(productoCompleto);
    }
  }

  vaciarCarritoCompra(){
    this.vaciarCarrito();
    this.actualizarTotalCarrito();
    this.numeroDeProductosDiferentes = this.numeroDeProductosDiferentes - 1;
    this.actualizarNumeroDeProductosDiferentes();
    localStorage.removeItem('carrito');
  }

 claveProducto(){
   this.router.navigate(['/finalizar-compra']);
 }

  carritoEmpty(){
    if(this.arrayCarrito.length > 0){
      this.carritoState = true;
    } else if (this.arrayCarrito.length <= 0){
      this.carritoState = false;
    }
  }

  vaciarCarrito() {
    this.arrayCarrito = [];
    localStorage.removeItem('carrito');
  }
}
