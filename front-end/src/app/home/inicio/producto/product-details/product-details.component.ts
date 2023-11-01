// src/app/product-details/product-details.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Importa AngularFirestore
import { runTransaction, doc, getFirestore } from 'firebase/firestore';
import { getDatabase, ref, get} from 'firebase/database';



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
  const db = getFirestore();
  const productoRef = doc(db, `productos/${this.producto.id}`);
  
  console.log('ID del producto:', this.producto.id);
  console.log(`productos/${this.producto.id}`);  // Log the full Firestore document path
  
  runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(productoRef);
    if (!sfDoc.exists()) {
      throw "Document does not exist!";
    }
    
    const newStock = sfDoc.data()['stock'] - 1;
    if (newStock >= 0) {
      transaction.update(productoRef, { stock: newStock });
      console.log('Stock actualizado con éxito');
      console.log('Nuevo stock:', newStock);

    } else {
      console.log('No hay stock disponible');
    }
  })
  .catch((error: any) => {
    console.error('Error al actualizar stock: ', error);
  });
}
}
  