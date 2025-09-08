import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Autenticacion, Usuario } from '../../servicios/autenticacion';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  form:FormGroup;
  estaCargando = false;
  mensajeError = '';
  chequeandoEmail = false;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacion: Autenticacion,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      area: ['', [Validators.required]],
      email: ['', 
        [Validators.required, Validators.email], 
        [this.emailExistenteValidador()]
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  emailExistenteValidador(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 3) {
        return of(null);
      }

      this.chequeandoEmail = true;

      return of(control.value).pipe(
        debounceTime(500), // Esperar 500ms después de que el usuario deje de escribir
        switchMap(email => 
          this.autenticacion.verificarEmailExistente(email).pipe(
            map(existe => {
              this.chequeandoEmail = false;
              return existe ? { emailYaRegistrado: true } : null;
            }),
            catchError(() => {
              this.chequeandoEmail = false;
              return of(null);
            })
          )
        )
      );
    };
  }

  onEnviar(event: Event) {
    event.preventDefault();
    
    if (this.form.valid) {
      this.estaCargando = true;
      this.mensajeError = '';

      const usuario: Usuario = {
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        area: this.form.value.area,
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.autenticacion.registrarse(usuario).subscribe({
        next: (usuarioRegistrado) => {
          this.estaCargando = false;
          console.log('Usuario registrado exitosamente:', usuarioRegistrado);
          this.router.navigate(['/inicio-sesion']);
        },
        error: (error) => {
          this.estaCargando = false;
          console.error('Error al registrar usuario:', error);
          

          if (error.type === 'EMAIL_DUPLICADO') {
            this.mensajeError = error.message;
          } else {
            this.mensajeError = 'Error al registrar el usuario. Por favor, intenta nuevamente.';
          }
        }
      });
    } else {           
      this.form.markAllAsTouched();  
    } 
  }

  get Nombre() 
  { 
    return this.form.get("nombre"); 
  } 

  get Apellido() 
  { 
    return this.form.get("apellido"); 
  } 

  get Area() 
  { 
    return this.form.get("area"); 
  } 
  
  get Email() 
  { 
    return this.form.get("email"); 
  } 

  get Password() 
  { 
    return this.form.get("password"); 
  } 

  get ConfirmPassword() 
  { 
    return this.form.get("confirmPassword"); 
  } 

  confirmarPassword(event:Event) 
  { 
    const password = this.form.get('password')?.value; 
    const confirmPassword = this.form.get('confirmPassword')?.value;
    if (password !== confirmPassword) 
    {  
      this.form.get('confirmPassword')?.setErrors({ 'noCoinciden': true }); 
    }
  }
}