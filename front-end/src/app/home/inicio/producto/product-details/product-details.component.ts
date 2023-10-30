// src/app/product-details/product-details.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Importa AngularFirestore
import { map } from 'rxjs/operators';  // Importa el operador map
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import * as firebase from 'firebase/compat';
import { getDatabase, ref, get } from 'firebase/database';



// Definir una interfaz para el documento del producto
interface Producto {
  stock: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  usuario: string;
  estado: string;
}


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})

export class ProductDetailsComponent implements OnInit {

  @Input() producto: any;
  
  isLiked: boolean = false; // Variable para mantener el estado de "me gusta"

  constructor(private modalController: ModalController, private firestore: AngularFirestore) { }

  ngOnInit(

  ) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
  
  toggleLike() {
    this.isLiked = !this.isLiked;
  }
  commentProduct() {
    // Lógica para comentar el producto
  }

  shareProduct() {
    // Lógica para compartir el producto
  }

  reportProduct() {
    // Lógica para reportar el producto
  }


  getProductData(productId: string) {
    const db = getDatabase();
    const productRef = ref(db, 'products/' + productId);
    get(productRef).then((snap) => {
        if (snap.exists()) {
            console.log(snap.val());
        } else {
            console.log("No data available for product: ", productId);
        }
    }).catch((error) => {
        console.error(error);
    });
}
  
  comprarProducto() {
    const productoRef = this.firestore.doc(`productos/${this.producto.id}`);
    console.log('ID del producto:', this.producto.id);
    console.log(`productos/${this.producto.id}`);  // Log the full Firestore document path


    const subscription = productoRef.snapshotChanges().pipe(
      map(action => {
        // Assuming this is the correct way to get the data, which may not be correct.
        const data = action.payload.data() as Producto;
        const id = action.payload.id;
        console.log('Datos del producto:', data);
        return { ...data, id };
      })
    ).subscribe((doc: Producto) => {
      const data = doc as Producto;
      const stockActual = data.stock;
      console.log('Stock actual:', stockActual);

      if (stockActual > 0) {
        const nuevoStock = stockActual - 1;

        productoRef.update({ stock: nuevoStock })
          .then(() => {
            console.log('Stock actualizado con éxito');
            subscription.unsubscribe();  // Move the unsubscription here
          })
          .catch((error: any) => {
            console.error('Error al actualizar stock: ', error);
            subscription.unsubscribe();  // Make sure to unsubscribe in case of error as well
          });
      } else {
        console.log('No hay stock disponible');
        subscription.unsubscribe();  // Make sure to unsubscribe if no stock
      }
    });
  }
}
  