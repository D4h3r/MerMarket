import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PickerController, PickerOptions } from '@ionic/angular';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {

  formularioPublicacion: FormGroup = this.formBuilder.group({
    nombre: ['',Validators.required],
    precio: ['',Validators.required],
    descripcion: ['',Validators.required],
    estado: ['',Validators.required],
    imagen: ['',Validators.required],
  });

  errorMessage: { [key: string]: string } = {};
  pickerOpts: {text: string; value: string}[] = [];

  public flag = true;
  public status = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pickerController: PickerController
  ) {}

  ngOnInit() {
  }

  goToInicio(){
    this.router.navigate(['/home/inicio']);
  }

  continuarPrueba(n: number) {
    if (n === 1) {
      if (
        this.formularioPublicacion.value.nombre !== "" &&
        this.formularioPublicacion.value.precio !== "" &&
        this.formularioPublicacion.value.descripcion !== "" &&
        this.formularioPublicacion.value.estado !== "" &&
        this.formularioPublicacion.value.imagen !== ""
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


    console.log("Funciona la función continuarPrueba");
  }

  get f() {
    return this.formularioPublicacion.controls;
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
              case 'estado': {
                this.formularioPublicacion.patchValue({
                  estado: selectedOption,
                });
                break;
              }
              case 'categoria': {
                this.formularioPublicacion.patchValue({
                  categoria: selectedOption,
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

  getCategoria() {
    this.pickerOpts = [];
    const comidaOption = {
      text: 'Comida',
      value: 'comida',
    };
    const construccionOption = {
      text: 'Materiales de construccion',
      value: 'construccion',
    };
    const ropaOption = {
      text: 'Ropa',
      value: 'ropa',
    };
    const tecnologiaOption = {
      text: 'Tecnologia',
      value: 'tecnologia',
    };
    const variosOption = {
      text: 'Varios',
      value: 'varios',
    };
    this.pickerOpts.push(comidaOption);
    this.pickerOpts.push(construccionOption);
    this.pickerOpts.push(ropaOption);
    this.pickerOpts.push(tecnologiaOption);
    this.pickerOpts.push(variosOption);

    this.openPicker('categoria');
  }

  getEstado() {
    this.pickerOpts = [];
    const porvencerOption = {
      text: 'Por Vencer',
      value: 'Por vencer',
    };
    const vencidoOption = {
      text: 'Vencido',
      value: 'Vencido',
    };
    const rotoOption = {
      text: 'Roto',
      value: 'Roto',
    };
    const defectuosoOption = {
      text: 'Defectuoso',
      value: 'Defectuoso',
    };
    this.pickerOpts.push(porvencerOption);
    this.pickerOpts.push(vencidoOption);
    this.pickerOpts.push(rotoOption);
    this.pickerOpts.push(defectuosoOption);

    this.openPicker('estado');
  }

  enviarRegistro() {
    if (this.formularioPublicacion.invalid) {
      const controls = this.formularioPublicacion.controls;
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
