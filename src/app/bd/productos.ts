export class productos{
  idProducto = 0;
  fotoProducto = "";
  nombreProducto = "";
  descripcionProducto = "";
  categoriaProducto = 0;
  precioProducto = 0;
  descuentoProducto = false;
  porcentajeDescuentoProducto = 0;
  constructor(newIdProducto: number, newFotoProducto: string, newNombreProducto: string, newDescripcionProducto: string, newCategoriaProducto: number, newPrecioProducto: number, newDescuentoProducto: boolean, newPorcentajeDescuentoProducto: number){
    this.idProducto = newIdProducto;
    this.fotoProducto = newFotoProducto;
    this.nombreProducto = newNombreProducto;
    this.descripcionProducto = newDescripcionProducto;
    this.categoriaProducto = newCategoriaProducto;
    this.precioProducto = newPrecioProducto;
    this.descuentoProducto = newDescuentoProducto;
    this.porcentajeDescuentoProducto = newPorcentajeDescuentoProducto;
  }
}
