import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { confirmarCalveValidator } from '../../models/clave.validator';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  form!: FormGroup;
  public showLoadingGif = false;
  public tipoUsuario: any;
  public especialidades: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private especialidadesService: EspecialidadesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        tipoUsuario: new FormControl('Usuario', Validators.required),
        nombre: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.minLength(3),
          Validators.maxLength(16),
        ]),
        apellido: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.minLength(3),
          Validators.maxLength(16),
        ]),
        dni: new FormControl('', [Validators.required]),
        edad: new FormControl('', [
          Validators.required,
          Validators.min(18),
          Validators.max(99),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ]),
        clave: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        repiteClave: new FormControl('', Validators.required),
        obraSocial: new FormControl('', Validators.required),
        especialidad: new FormControl('', Validators.required),
      },
      confirmarCalveValidator()
    );

    this.especialidadesService.getEspecialidades().subscribe((data) => {
      this.especialidades = data.especialidades;
    });

    this.form.get('tipoUsuario')?.valueChanges.subscribe((value) => {
      if (value === 'Usuario') {
        this.form.controls['obraSocial'].setValidators([Validators.required]);
        this.form.controls['especialidad'].clearValidators();
      } else if (value === 'Medico') {
        this.form.controls['especialidad'].setValidators([Validators.required]);
        this.form.controls['obraSocial'].clearValidators();
      }
      this.form.controls['obraSocial'].updateValueAndValidity();
      this.form.controls['especialidad'].updateValueAndValidity();
    });
  }

  // Getters para facilitar el acceso a los campos
  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get dni() {
    return this.form.get('dni');
  }
  get edad() {
    return this.form.get('edad');
  }
  get email() {
    return this.form.get('email');
  }
  get clave() {
    return this.form.get('clave');
  }
  get repiteClave() {
    return this.form.get('repiteClave');
  }
  get obraSocial() {
    return this.form.get('obraSocial');
  }
  get especialidad() {
    return this.form.get('especialidad');
  }

  // registrar() {
  //   if (this.form.valid) {
  //     this.showLoadingGif = true;
  //     const { email, clave, nombre, apellido, edad } = this.form.value;
  //     this.authService
  //       .register(email, clave)
  //       .then(() => {
  //         this.authService.optionalRegisterData(email, nombre, apellido, edad);
  //         Swal.fire({
  //           title: 'Éxito',
  //           text: '¡Usuario registrado correctamente!',
  //           icon: 'success',
  //           timer: 4000,
  //           timerProgressBar: true,
  //         });
  //         this.router.navigate(['/home']);
  //       })
  //       .catch((error: string) => {
  //         Swal.fire({
  //           title: 'Error',
  //           text: error,
  //           icon: 'error',
  //           timer: 4000,
  //           timerProgressBar: true,
  //         });
  //         this.showLoadingGif = false;
  //       });
  //   } else {
  //     let errorMessage = 'Revisa los campos del formulario:';
  //     if (this.email?.hasError('required')) {
  //       errorMessage += '\n - El correo electrónico es obligatorio.';
  //     }
  //     if (this.email?.hasError('pattern')) {
  //       errorMessage +=
  //         '\n - Formato de correo inválido. Ejemplo: nombre@dominio.com';
  //     }
  //     if (this.nombre?.hasError('required')) {
  //       errorMessage += '\n - El nombre es obligatorio.';
  //     }
  //     if (this.apellido?.hasError('required')) {
  //       errorMessage += '\n - El apellido es obligatorio.';
  //     }
  //     if (this.edad?.hasError('min')) {
  //       errorMessage += '\n - Debes ser mayor de 18 años.';
  //     }
  //     if (this.clave?.hasError('minlength')) {
  //       errorMessage += `\n - La clave debe tener mínimo ${
  //         this.clave?.getError('minlength').requiredLength
  //       } caracteres.`;
  //     }

  //     Swal.fire({
  //       title: 'Error',
  //       text: errorMessage,
  //       icon: 'error',
  //       timer: 4000,
  //       timerProgressBar: true,
  //     });
  //   }
  // }

  loguear() {
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/home']);
  }
}
