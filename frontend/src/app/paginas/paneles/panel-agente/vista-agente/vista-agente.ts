import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-vista-agente',
  imports: [ReactiveFormsModule],
  templateUrl: './vista-agente.html',
  styleUrl: './vista-agente.css'
})
export class VistaAgente {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      estado: ['', Validators.required],
      acciones: ['', Validators.required]
    });
  }

  onEnviar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      alert('Formulario enviado.');
    } else {
      alert('El formulario no es válido.');
      this.form.markAllAsTouched();
    }
  }

  get Estado() {
    return this.form.get('estado');
  }
  
  get Acciones() {
    return this.form.get('acciones');
  }
}
