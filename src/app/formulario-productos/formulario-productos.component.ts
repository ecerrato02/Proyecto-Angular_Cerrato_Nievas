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

  constructor(private http: HttpClient, public idProd: IdProductosService) {

  }

  async agregarProducto(){
    console.log(this.productNameUrl)
    try {
      const intentarAnadir = this.http.post('http://172.16.10.1:3080/api/afegirProducte', {
        productNameUrl: this.productNameUrl,
        fotoProducto: this.fotoProducto,
        nombreProducto: this.nombreProducto,
        descripcionProducto: this.descripcionProducto,
        descripcionLargaProducto: this.descripcionLargaProducto,
        categoriaProducto: this.categoriaProducto,
        precioProducto: this.precioProducto,
        descuentoProducto: this.descuentoProducto,
        porcentajeDescuentoProducto: this.porcentajeDescuentoProducto,
        soMinimoProducto: this.soMinimoProducto,
        procesadorMinimoProducto: this.procesadorMinimoProducto,
        memoriaMinimoProducto: this.memoriaMinimoProducto,
        graficosMinimoProducto: this.graficosMinimoProducto,
        hardwareRecomendadoProducto: this.hardwareRecomendadoProducto,
        steamProducto: this.steamProducto,
        ubisoftProducto: this.ubisoftProducto,
        switchProducto: this.switchProducto,
        xboxProducto: this.xboxProducto,
        ps4Producto: this.ps4Producto,
        ps5Producto: this.ps5Producto,
        soRecomendadoProducto: this.soRecomendadoProducto,
        procesadorRecomendadoProducto: this.procesadorRecomendadoProducto,
        memoriaRecomendadoProducto: this.memoriaRecomendadoProducto,
        graficosRecomendadoProducto: this.graficosRecomendadoProducto,
        videoProducto: this.videoProducto,
        stock: this.stock
      }).subscribe();
      console.log('Producto agregado:', intentarAnadir);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }

  selectedFile: File | null = null;

  onSubmit() {
    if (!this.selectedFile) {
      alert('Por favor seleccione una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('productNameUrl', this.productNameUrl);
    formData.append('image', this.selectedFile);

    this.http.post<any>('http://172.16.10.1:3080/api/upload', formData).subscribe(
      response => {
        console.log('Imagen subida exitosamente:', response);
        alert('Imagen subida exitosamente');
      },
      error => {
        console.error('Error al subir imagen:', error);
        alert('Error al subir imagen');
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fotoProducto = file.name;
    this.selectedFile = file;
  }
}
