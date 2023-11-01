import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { DocumentData, collection, getFirestore, query, getDocs } from '@firebase/firestore';

import { ProductDetailsComponent } from '../inicio/producto/product-details/product-details.component';
import { ModalController } from '@ionic/angular';


interface PageItem {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  items = ["Hola", "putas"];
  productos: any[] = []; 

  // Menú de navegación lateral
  pages = [
    { title: 'Construccion', icon: 'construct' },
    { title: 'Productos envasados', icon: 'cube' },
    { title: 'Frutas y Verduras', icon: 'leaf' },
    { title: 'Libros', icon: 'book' },
    { title: 'Mascotas', icon: 'paw' },
    { title: 'Ropa', icon: 'shirt' },
    { title: 'Regalos', icon: 'gift' }
  ];

  db = getFirestore();

  constructor(
    private modalController: ModalController,
    private router: Router,
    private auth: AuthService,
    private menu: MenuController
  ) { 
    
  }

  ngOnInit() {
    this.generateItems();
    this.cargarProductos();
    this.obtenerId();
  }

  async cargarProductos(){
    try {
      const queryCollection = query(collection(this.db, 'productos'));
      const querySnapshot = await getDocs(queryCollection);
      const data: any[] = [];
      
      querySnapshot.forEach((producto) => {
        data.push(producto.data());
      });

      this.productos = data;
    } catch (error) {
      console.log(error);
    }
  }

  async obtenerId(){
    try {
      const queryCollection = query(collection(this.db, 'productos'));
      const querySnapshot = await getDocs(queryCollection);
      const data: any[] = [];
      
      querySnapshot.forEach((producto) => {
        const productoData = producto.data();
        data.push({
          id: producto.id,  // Agregando el id del producto
          ...productoData   // Agregando el resto de los datos del producto
        });
      });
  
      this.productos = data;
    } catch (error) {
      console.log(error);
    }
  }

  

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  llenarInicio(producto: DocumentData) {
    //declaracion de varuables
    
  }
  
  cerrarSesion() {
    this.auth.cerrarSesion()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión', error);
      });
  }

  
  

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  // Navega a la página de editar perfil
  goToEditProfile() {
    // Puedes cambiar esto a la ruta correcta para tu aplicación
    this.router.navigate(['/edit-profile']);
  }

  // Abre una página específica desde el menú desplegable
  openPage(page: PageItem) {
    this.router.navigate([`/${page.title.toLowerCase().replace(' ', '-')}`]);
    this.menu.close();
  }


  async openProductDetails(producto: any) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: { producto: producto }
    });
    return await modal.present();
  }
  
}

