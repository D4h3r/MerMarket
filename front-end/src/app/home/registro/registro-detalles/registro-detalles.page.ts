import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-detalles',
  templateUrl: './registro-detalles.page.html',
  styleUrls: ['./registro-detalles.page.scss'],
})

export class RegistroDetallesPage implements OnInit {
  
  registroDetallesForm: FormGroup;
  status: number = 0;  // Definir la propiedad status aquí

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.registroDetallesForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: this.checkPasswords });
  }

  ngOnInit() {}

  checkPasswords(group: FormGroup) {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true };  
  }

  onSubmit() {
    if (this.registroDetallesForm.valid) {
      // Procesa los datos aquí
      console.log('Formulario válido', this.registroDetallesForm.value);
      // Redirecciona o realiza otras acciones
    } else {
      console.error('Formulario inválido');
    }
  }
}
