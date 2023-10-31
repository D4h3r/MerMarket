import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PickerController, PickerOptions } from '@ionic/angular';
import { COUNTRY_REGION } from '../../../assets/resources/country_data/paises';
import { validate, clean, format, getCheckDigit } from 'rut.js';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public submitted = false;

  public flag = true;
  public mostrar: boolean = false;
  public rutValidated = true;
  public status = 0;
  public flagImagen = true;


  formularioRegistroPersonal: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    rut: new FormControl('', [Validators.required]),
    sexoUsuario: ['', Validators.required],
    paisUsuario: ['', Validators.required],
  });

  errorMessage: { [key: string]: string } = {};
  pickerOpts: { text: string; value: string }[] = [];
  paises = COUNTRY_REGION;

  sexoUsuario = {
    value: 'Sexo',
    color: '#9F9A9A',
  };

  paisUsuario = {
    value: 'Pais de residencia',
    color: '#9F9A9A',
  };



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

  continuarPrueba(n: number) {
    if (n === 1) {
        if (
            this.formularioRegistroPersonal.value.nombre !== "" &&
            this.formularioRegistroPersonal.value.apellido !== "" &&
            this.formularioRegistroPersonal.value.rut !== "" &&  // Asegura que el campo RUT no esté vacío
            this.rutValidated &&  // Verifica que el RUT sea válido
            this.formularioRegistroPersonal.value.sexoUsuario !== "" &&
            this.formularioRegistroPersonal.value.paisUsuario !== ""
        ) {
            this.status = n;
            this.flag = true;
        } else {
            this.flag = false;
        }
    } else {
        this.status = n;
        this.flag = true;
    }
    this.router.navigate(['/registro-detalles']);

    console.log("Funciona la función continuarPrueba");
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

  formatRut()
  {
    this.rutValidated = validate(this.formularioRegistroPersonal.value.rut);  // Actualizado aquí
    let rut = format(this.formularioRegistroPersonal.value.rut);  // Actualizado aquí
    this.formularioRegistroPersonal.patchValue({ rut });  // Actualizado aquí

    return this.rutValidated;
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
    const masculinoOption = {
      text: 'Masculino',
      value: 'Masculino',
    };
    const femeninoOption = {
      text: 'Femenino',
      value: 'Femenino',
    };
    this.pickerOpts.push(masculinoOption);
    this.pickerOpts.push(femeninoOption);

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