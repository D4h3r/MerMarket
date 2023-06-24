import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PickerController, PickerOptions } from '@ionic/angular';
import { validate, format } from 'rut.js';
import { COUNTRY_REGION } from '../../../assets/resources/country_data/paises';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistroPersonal: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    rut: ['', Validators.required],
    sexoUsuario: ['', Validators.required],
    paisUsuario: ['', Validators.required],
  });

  errorMessage: { [key: string]: string } = {};
  pickerOpts: { text: string; value: string }[] = [];
  paises = COUNTRY_REGION;

  sexoUsuario = {
    value: 'Sexo',
    color: '#D9D9D9',
  };

  paisUsuario = {
    value: 'Pais de residencia',
    color: '#D9D9D9',
  };

  public flag = true;
  public mostrar: boolean = false;
  public rutValidated = true;
  public status = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pickerController: PickerController
  ) {}

  ngOnInit() {
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

  get f() {
    return this.formularioRegistroPersonal.controls;
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

  formatRut() {
    const rutValidated = validate(this.formularioRegistroPersonal.value.rut); // Valida el rut
    if (rutValidated) {
      const rut = format(this.formularioRegistroPersonal.value.rut); // Formatea el rut
      this.formularioRegistroPersonal.patchValue({ rut });
    } else {
      // Realiza acciones cuando el rut no es válido
    }
  }

  async openPicker(value: string) {
    const pickerOpts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Listo',
          handler: (selectedValue: any) => {
            const selectedOption =
              selectedValue['Seleccione una opción'].value;

            switch (value) {
              case 'sexo': {
                this.formularioRegistroPersonal.patchValue({
                  sexoUsuario: selectedOption,
                });
                break;
              }
              case 'pais': {
                this.formularioRegistroPersonal.patchValue({
                  paisUsuario: selectedOption,
                });
                break;
              }
              default:
                break;
            }
          },
        },
      ],
      columns: [
        {
          name: 'Seleccione una opción',
          options: this.pickerOpts,
        },
      ],
    };

    const picker = await this.pickerController.create(pickerOpts);
    picker.present();
  }

  getSexo() {
    this.pickerOpts = [];
    let obj = {
      text: 'Masculino',
      value: 'Masculino',
    };
    let obj2 = {
      text: 'Femenino',
      value: 'Femenino',
    };
    this.pickerOpts.push(obj);
    this.pickerOpts.push(obj2);

    this.openPicker('sexo');
  }

  getPais() {
    this.pickerOpts = [];
    let country: {
      text: string;
      value: string;
    };
    this.paises.forEach((pais) => {
      country = {
        text: pais.countryName,
        value: pais.countryName,
      };
      this.pickerOpts.push(country);
    });
    console.log(this.pickerOpts);
    this.openPicker('pais');
  }
}
