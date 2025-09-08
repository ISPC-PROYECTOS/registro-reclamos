import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Autenticacion } from '../../servicios/autenticacion';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inicio-sesion',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css'
})
export class InicioSesion {
  form!: FormGroup;
  mensajeError: string = '';
  estaCargando: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private autenticacion: Autenticacion,
    private router: Router
  ){ 
    this.form=this.formBuilder.group(
      {
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
      }
    )
  }

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid){
      this.estaCargando = true;
      this.mensajeError = '';

      const { email, password } = this.form.value;
      this.autenticacion.iniciarSesion(email, password).subscribe({
        next: (usuario) => {
          this.estaCargando = false;
          if (usuario) {
            alert(`¡Bienvenido ${usuario.nombre}!`);
            this.router.navigate(["/vista-usuario"])
          } else {
            this.mensajeError = "Credenciales incorrectas";
          }
        },
        error: (error) => {
          this.estaCargando = false;
          this.mensajeError = "Ocurrió un error al iniciar sesión";
          console.error("Error al iniciar sesión:", error)
        }
      });

    }
    else{
      this.form.markAllAsTouched();
    }
  }

  get Email(){
    return this.form.get("email");
  }
  get Password(){
    return this.form.get("password");
  }
}
