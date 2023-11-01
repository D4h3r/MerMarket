import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/'; 
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

  loginUser() {
    const email = this.validationFormUser.value.email;
    const password = this.validationFormUser.value.password;
  
    this.authService.loginFireauth({ email, password })
      .then((result) => {
        console.log(result);
        if (result.user) {
          this.nav.navigateForward(['home/inicio']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  
}