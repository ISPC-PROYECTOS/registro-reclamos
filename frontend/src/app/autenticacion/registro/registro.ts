import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  form!:FormGroup;
  constructor(private formBuilder: FormBuilder){ 
    this.form=this.formBuilder.group(
      {
      nombre:['',[]],
      apellido:['',[]],
      dni:['',[]],
      email:['',[]],
      password:['',[]],
      }
    )
  }

  onEnviar(event:Event) 
  { 
    console.log(this.form.value) 
  } 
}