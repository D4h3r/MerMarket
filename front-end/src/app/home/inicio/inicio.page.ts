import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonCard } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { async } from 'rxjs';
import { Firestore, collection, getFirestore } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore/lite';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { ProductoPage } from './producto/producto.page';
import { DocumentData } from '@angular/fire/compat/firestore';
import { NgFor } from '@angular/common';

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
  productosFB: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private menu: MenuController
  ) { 
    
  }

  ngOnInit() {
    this.generateItems();
    this.llenarInicio();
  }

  async cargarProductos(){
    const querySnapshot = await getDocs(collection(this.db, 'tu-coleccion'));
    querySnapshot.forEach((doc) => {
      this.productosFB.push(doc.data());
    });
  }

  

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  llenarInicio() {
    //declaracion de varuables
    let ion_card = document.createElement('ion-card');
    let img = document.createElement('img');
    let ion_card_header = document.createElement('ion-card-header');
    let ion_card_title = document.createElement('ion-card-title');
    let ion_card_subtitle = document.createElement('ion-card-subtitle');
    let ion_card_content = document.createElement('ion-card-content');
    let paneles = document.getElementById('paneles');

    //iteracion con los datos por producto
    for (var producto of this.productosFB) {
      img.setAttribute('src', 'https://i1.sndcdn.com/artworks-F11dor2dKfIo0DA6-zRbrxg-t500x500.jpg');
      ion_card_title.innerText = producto.nombre;
      ion_card_subtitle.innerText = '$' + producto.precio;
      ion_card_content.innerText = producto.descripcion.substring(0,20);
      ion_card_header.append(ion_card_title);
      ion_card.append(ion_card_header);
      ion_card.append(ion_card_content);
      paneles?.append(ion_card);
      console.log(producto.nombre);
    }
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
