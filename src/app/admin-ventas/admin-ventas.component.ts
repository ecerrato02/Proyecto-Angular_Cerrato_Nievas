import {Component, OnInit} from '@angular/core';
import {NgxEchartsDirective} from "ngx-echarts";
import {EChartsOption} from "echarts";
import {RouterLinkActive} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-admin-ventas',
  standalone: true,
  imports: [
    NgxEchartsDirective,
    RouterLinkActive
  ],
  templateUrl: './admin-ventas.component.html',
  styleUrl: './admin-ventas.component.css'
})
export class AdminVentasComponent implements OnInit {
  options: EChartsOption[] = [];

  async obtenerVentasUltimosNDias(id: number){
    let nums: number[] = []
    for (let i = 0; i < 30; i++){
      let req = new HttpParams().set('id', id).set('dias', i);
      let num: any = await firstValueFrom(this.http.get<number>('http://172.16.10.1/api/sales', {params: req}));
      nums.push(parseInt(num[0].total));
    }
    for (let i = 0; i < 30; i++){
      if(isNaN(nums[i])) {
        nums[i] = 0;
      }
    }
    return nums;
  }

  async getAllID() {
    let ids: number[] = [];
    this.http.get<number>('http://localhost:3020/api/allIdProducts').subscribe((data) => {
      ids.push(data);
    });
    console.log(ids);
    return ids;
  }



  constructor(private http: HttpClient) {
    this.getAllID().then();
    // for(let i = 0; )
  }

  ngOnInit() {
    this.getAllID().then(r =>
    console.log(this.getAllID()))
    let dailySalesData: any[] | undefined = [];
    let monthlySalesData: any[] | undefined = [];

    // try {
    //   dailySalesData = await this.http.get<any[]>('http://172.16.10.1/api/daily-sales').toPromise();
    //   monthlySalesData = await this.http.get<any[]>('http://172.16.10.1/api/monthly-sales').toPromise();
    // } catch (error) {
    //   console.error('Error fetching data', error);
    // }
    // this.options = [
    //   {
    //     legend: {
    //       data: ['Productos'],
    //       align: 'left',
    //     },
    //     tooltip: {},
    //     xAxis: {
    //       data: dailySalesData ? dailySalesData.map(item => item.nombreProducto) : [],
    //       silent: false,
    //       splitLine: {
    //         show: false,
    //       },
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: 'Productos',
    //         type: 'line',
    //         data: dailySalesData ? dailySalesData.map(item => item.ventasDiarias) : [],
    //         animationDelay: idx => idx * 10,
    //       },
    //     ],
    //     animationEasing: 'elasticOut',
    //     animationDelayUpdate: idx => idx * 5,
    //   },
    //   // Configuración del gráfico de ventas mensuales
    //   {
    //     legend: {
    //       data: ['Productos con Oferta', 'Productos sin Oferta'],
    //       align: 'left',
    //     },
    //     tooltip: {},
    //     xAxis: {
    //       data: monthlySalesData ? monthlySalesData.map(item => item.nombreProducto) : [],
    //       silent: false,
    //       splitLine: {
    //         show: false,
    //       },
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: 'Productos con Oferta',
    //         type: 'line',
    //         data: monthlySalesData ? monthlySalesData.filter(item => item.descuentoProducto).map(item => item.ventasMensuales) : [],
    //         animationDelay: idx => idx * 10,
    //       },
    //       {
    //         name: 'Productos sin Oferta',
    //         type: 'line',
    //         data: monthlySalesData ? monthlySalesData.filter(item => !item.descuentoProducto).map(item => item.ventasMensuales) : [],
    //         animationDelay: idx => idx * 10 + 100,
    //       },
    //     ],
    //     animationEasing: 'elasticOut',
    //     animationDelayUpdate: idx => idx * 5,
    //   },
    // ];
  }


}
