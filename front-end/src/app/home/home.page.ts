import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/'; 
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public validationUserMessage = {
    email: [
      { type: 'required', message: 'Por favor ingresa tu correo electrónico' },
      { type: 'pattern', message: 'El correo electrónico ingresado es incorrecto. Intenta nuevamente' }
    ],
    password: [
      { type: 'required', message: 'Por favor ingresa tu contraseña' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ]
  };

  validationFormUser: FormGroup = new FormGroup({});

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private firestore: AngularFirestore,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  loginUser(value: { email: any; password: any; }) {
    console.log('Iniciando sesión...');
    try {
      this.authService.loginFireauth(value).then((resp) => {
        console.log(resp);
        if (resp.user) {
          this.authService.setUser({
            username: resp.user.displayName,
            uid: resp.user.uid
          });

          const userProfile = this.firestore.collection('profile').doc(resp.user.uid);
          userProfile.get().subscribe((result: { exists: any; }) => {
            if (result.exists) {
              this.nav.navigateForward(['../home/inicio']);
            } else {
              this.firestore.doc(`profile/${this.authService.getUID()}`).set({
                name: resp.user.displayName,
                email: resp.user.email
              });
              this.nav.navigateForward(['uploadimage']);
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
