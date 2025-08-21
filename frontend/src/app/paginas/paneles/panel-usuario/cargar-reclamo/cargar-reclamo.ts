import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cargar-reclamo',
  standalone: true, // Esto indica que el componente no pertenece a un NgModule
  imports: [ReactiveFormsModule],
  templateUrl: './cargar-reclamo.html',
  styleUrl: './cargar-reclamo.css'
})
export class CargarReclamo {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required]
    });
  }

  onEnviar(event: Event) {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
    } else {
      console.log('El formulario no es válido.');
      this.form.markAllAsTouched();
    }
  }
}


