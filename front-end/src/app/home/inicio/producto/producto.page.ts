import { Component, OnInit, inject } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  producto: any;
  
  items = ["", ""]; 

  nombre: string = '';
  imagenes: any[] = [];
  precio: number = 0;
  descripcion: string = '';
  categoria: string = '';
  estado: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {
   }

   ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productoID = params['id'];
      this.obtenerProducto(productoID);
    });
  }
  
  obtenerProducto(productoID: string) {
    this.firestore.collection('productos').doc(productoID).valueChanges().subscribe((producto: any) => {
      this.producto = producto;
    });
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }


  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}