import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {
  NgbAccordionBody,
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem, NgbAccordionModule
} from "@ng-bootstrap/ng-bootstrap";
import {IdProductosService} from "../id-productos.service";
import {RouterLinkActive} from "@angular/router";


@Component({
  selector: 'app-formulario-productos',
  standalone: true,
  imports: [HttpClientModule,
    FormsModule,
    CommonModule, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionBody, NgbAccordionModule, RouterLinkActive
  ],
  templateUrl: './formulario-productos.component.html',
  styleUrl: './formulario-productos.component.css'
})

export class FormularioProductosComponent {
  productNameUrl: string = '';
  fotoProducto: string = '';
  nombreProducto: string = '';
  descripcionProducto: string = '';
  descripcionLargaProducto: string = '';
  categoriaProducto: number = 0;
  precioProducto: number = 0;
  descuentoProducto: boolean = false;
  porcentajeDescuentoProducto: number = 0;
  soMinimoProducto: string = '';
  procesadorMinimoProducto: string = '';
  memoriaMinimoProducto: string = '';
  graficosMinimoProducto: string = '';
  hardwareRecomendadoProducto: number = 0;
  steamProducto: boolean = false;
  ubisoftProducto: boolean = false;
  switchProducto: boolean = false;
  xboxProducto: boolean = false;
  ps4Producto: boolean = false;
  ps5Producto: boolean = false;
  soRecomendadoProducto: string = '';
  procesadorRecomendadoProducto: string = '';
  memoriaRecomendadoProducto: string = '';
  graficosRecomendadoProducto: string = '';
  videoProducto: string = '';
  stock: number = 0;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, public idProd: IdProductosService) {
  }

  async agregarProducto() {
    console.log(this.productNameUrl);
    try {
      if (!this.selectedFile) {
        alert('Por favor seleccione una imagen');
        return;
      }

      const formData = new FormData();
      formData.append('fotoProducto', this.selectedFile);
      formData.append('productNameUrl', this.productNameUrl);
      formData.append('nombreProducto', this.nombreProducto);
      formData.append('descripcionProducto', this.descripcionProducto);
      formData.append('descripcionLargaProducto', this.descripcionLargaProducto);
      formData.append('categoriaProducto', this.categoriaProducto.toString());
      formData.append('precioProducto', this.precioProducto.toString());
      formData.append('descuentoProducto', this.descuentoProducto.toString());
      formData.append('porcentajeDescuentoProducto', this.porcentajeDescuentoProducto.toString());
      formData.append('soMinimoProducto', this.soMinimoProducto);
      formData.append('procesadorMinimoProducto', this.procesadorMinimoProducto);
      formData.append('memoriaMinimoProducto', this.memoriaMinimoProducto);
      formData.append('graficosMinimoProducto', this.graficosMinimoProducto);
      formData.append('hardwareRecomendadoProducto', this.hardwareRecomendadoProducto.toString());
      formData.append('steamProducto', this.steamProducto.toString());
      formData.append('ubisoftProducto', this.ubisoftProducto.toString());
      formData.append('switchProducto', this.switchProducto.toString());
      formData.append('xboxProducto', this.xboxProducto.toString());
      formData.append('ps4Producto', this.ps4Producto.toString());
      formData.append('ps5Producto', this.ps5Producto.toString());
      formData.append('soRecomendadoProducto', this.soRecomendadoProducto);
      formData.append('procesadorRecomendadoProducto', this.procesadorRecomendadoProducto);
      formData.append('memoriaRecomendadoProducto', this.memoriaRecomendadoProducto);
      formData.append('graficosRecomendadoProducto', this.graficosRecomendadoProducto);
      formData.append('videoProducto', this.videoProducto);
      formData.append('stock', this.stock.toString());

      const response = await this.http.post<any>('http://172.16.10.1:3080/api/afegirProducte', formData).toPromise();
      console.log('Producto agregado:', response);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fotoProducto = file.name;
    this.selectedFile = file;
  }
}
