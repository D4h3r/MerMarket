import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  formularioRegistroPersonal: FormGroup;
  mostrar: boolean = false;
  errorMessage: { [key: string]: string };

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.formularioRegistroPersonal = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      sexo: [''],
      paisResidencia: ['']
    });
    this.errorMessage = {};
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  continuarPrueba() {
    this.mostrarFormularioFoto();
  }

  mostrarFormularioFoto() {
    this.mostrar = !this.mostrar;
  }

  enviarRegistro() {
    if (this.formularioRegistroPersonal.invalid) {
      const controls = this.formularioRegistroPersonal.controls;
      for (const c in controls) {
        if (controls[c].invalid) {
          if (controls[c].errors?.['pattern']) {
            console.log('Invalido: ' + this.errorMessage[c + 'Invalido']);
            // Realiza otras acciones si es necesario
            return;
          }
          console.log(c);
          console.log(this.errorMessage[c]);
          // Realiza otras acciones si es necesario
          return;
        }
      }
    }
  }
}
