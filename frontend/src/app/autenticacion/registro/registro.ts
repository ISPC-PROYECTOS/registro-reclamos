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
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      dni:['',[Validators.required, Validators.minLength(7)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(7)]],
      confirmPassword:['',[Validators.required]],
      }
    )
  }

  onEnviar(event:Event) 
  { 
    console.log(this.form.value) 
  } 

  get Nombre() 
  { 
    return this.form.get("nombre"); 
  } 

  get Apellido() 
  { 
    return this.form.get("apellido"); 
  } 

  get Dni() 
  { 
    return this.form.get("dni"); 
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
}