import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { DocumentData, collection, getFirestore } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore/lite';

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

  db = getFirestore();

  constructor(
    private router: Router,
    private auth: AuthService,
    private menu: MenuController
  ) { 
    
  }

  ngOnInit() {
    this.generateItems();
    this.cargarProductos();
  }

  async cargarProductos(){
    try {
      const querySnapshot = await getDocs(collection(this.db, 'productos'));
      querySnapshot.forEach((doc) => {
        this.llenarInicio(doc.data());
      });
    } catch (error) {
      console.log('falló :(');
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
    const ion_card = document.createElement('ion-card');
    const img = document.createElement('img');
    const ion_card_header = document.createElement('ion-card-header');
    const ion_card_title = document.createElement('ion-card-title');
    const ion_card_subtitle = document.createElement('ion-card-subtitle');
    const ion_card_content = document.createElement('ion-card-content');
    const paneles = document.getElementById('paneles');

    //iteracion con los datos por producto
    img.setAttribute('src', 'https://i1.sndcdn.com/artworks-F11dor2dKfIo0DA6-zRbrxg-t500x500.jpg');
    ion_card_title.innerText = producto['nombre'];
    ion_card_subtitle.innerText = '$' + producto['precio'];
    ion_card_content.innerText = producto['descripcion'].substring(0,20);
    ion_card_header.appendChild(ion_card_title);
    ion_card.appendChild(ion_card_header);
    ion_card.appendChild(ion_card_content);
    paneles?.appendChild(ion_card);
    console.log(producto['nombre']);
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

  
}
