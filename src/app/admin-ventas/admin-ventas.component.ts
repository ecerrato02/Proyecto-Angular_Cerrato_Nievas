import {Component, OnInit} from '@angular/core';
import {NgxEchartsDirective} from "ngx-echarts";
import {EChartsOption} from "echarts";
import {RouterLinkActive} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-ventas',
  standalone: true,
  imports: [
    NgxEchartsDirective,
    RouterLinkActive
  ],
  templateUrl: './admin-ventas.component.html',
  styleUrl: './admin-ventas.component.css',
})
export class AdminVentasComponent implements OnInit {
  options: EChartsOption = {};
  productNames: { [key: string]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Primero, obtenemos los nombres de los productos
    this.getProductNames().subscribe(
      (productNames: { [key: string]: string }) => {
        this.productNames = productNames;

        // Luego, obtenemos los datos de ventas
        this.http.get<any>('http://localhost:3080/api/ventas').subscribe(
          (ventasData: any[]) => {
            const series: any[] = [];
            const legendData: string[] = [];
            const xAxisData: string[] = []; // Array para almacenar las fechas formateadas

            // Iteramos sobre los datos de ventas
            ventasData.forEach((venta: any) => {
              const productId = venta.idProducto.toString();
              const productName = this.productNames[productId];

              // Agregamos el nombre de producto a la leyenda si no está ya agregado
              if (!legendData.includes(productName)) {
                legendData.push(productName);
              }

              // Si la serie para este producto aún no ha sido creada, la creamos
              if (!series.some(s => s.name === productName)) {
                series.push({
                  name: productName,
                  type: 'bar',
                  data: [], // Inicializamos los datos como un array vacío
                  emphasis: {
                    focus: 'series',
                    label: {
                      show: true,
                    },
                  },
                });
              }

              // Agregamos los datos de ventas para este producto a la serie correspondiente
              const index = series.findIndex(s => s.name === productName);
              series[index].data.push(venta.total_vendido);

              // Agregamos la fecha al eje X si no está ya agregada
              if (!xAxisData.includes(venta.fecha)) {
                xAxisData.push(venta.fecha);
              }
            });

            // Configuramos las opciones del gráfico
            this.options = {
              xAxis: {
                type: 'category',
                data: xAxisData,
              },
              yAxis: {
                type: 'value',
              },
              legend: {
                data: legendData,
              },
              series: series,
            };
          },
          (error) => {
            console.error('Error al obtener los datos de ventas:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los nombres de productos:', error);
      }
    );
  }

  // Método para obtener nombres de productos
  getProductNames(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(
      'http://localhost:3080/api/productos/nombres'
    );
  }
}
