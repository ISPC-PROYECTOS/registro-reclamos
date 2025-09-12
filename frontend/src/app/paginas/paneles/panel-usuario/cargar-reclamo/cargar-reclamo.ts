import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReclamosService, Reclamo } from '../../../../servicios/reclamos.service';
import { Autenticacion, Usuario } from '../../../../servicios/autenticacion';

@Component({
  selector: 'app-cargar-reclamo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cargar-reclamo.html',
  styleUrl: './cargar-reclamo.css'
})
export class CargarReclamo {
  form!: FormGroup;
  formMessage: string = ''; 

  constructor(
    private formBuilder: FormBuilder,
    private reclamosService: ReclamosService ,
    private autenticacion: Autenticacion
  ) {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(300)]],
      prioridad: ['', Validators.required]
    });
  }

  onEnviar(event: Event) {
    event.preventDefault();
    this.formMessage = ''; 

    if (this.form.valid) {
      const usuarioActual = this.autenticacion.obtenerUsuarioActual();
      const nuevoReclamo: Reclamo = {
        idUsuario: usuarioActual ? usuarioActual.id : "Usuario desconocido",
        usuario: usuarioActual ? `${usuarioActual.nombre} ${usuarioActual.apellido}` : 'Usuario desconocido',
        fechaHora: new Date().toLocaleString(),
        estado: 'Recibido',
        descripcion: this.form.value.descripcion,
        prioridad: this.form.value.prioridad,
      };

      
      this.reclamosService.crearReclamo(nuevoReclamo).subscribe({
        next: (response) => {
          this.formMessage = `Reclamo enviado correctamente. ID: ${response.id}`;
          console.log('Reclamo creado:', response);
          this.form.reset(); 
        },
        error: (error) => {
          this.formMessage = 'Hubo un error al enviar el reclamo. Por favor, inténtalo de nuevo.';
          console.error('Error al crear el reclamo:', error);
        }
      });
    } else {
      this.formMessage = 'Por favor, completa todos los campos requeridos.';
      this.form.markAllAsTouched();
    }
  }

  get Descripcion() {
    return this.form.get('descripcion');
  }
  
  get Prioridad() {
    return this.form.get('prioridad');
  }
}