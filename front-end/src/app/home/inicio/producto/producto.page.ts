import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  nombre: string = '';
  imagenes: any[] = [];
  precio: number = 0;
  descripcion: string = '';
  categoria: string = '';
  estado: string = '';
  
  constructor() {
   }

  ngOnInit() {
  }


}
