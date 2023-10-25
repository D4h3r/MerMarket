import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/configfb';
import { collection, getFirestore } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore/lite';
import { FirebaseFirestore } from '@firebase/firestore-types';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private menu: MenuController
  ) { 
    
  }

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  /*
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);

  async  getProductos(db: FirebaseFirestore) {
    const productosColletion = collection(db , 'productos');
    const productosSnapshot = await getDocs(productosColletion);
    const productosList = productosSnapshot.docs.map(doc => doc.data());
    return productosList;
  }
*/
  
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

  
}
