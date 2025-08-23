import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css'
})
export class InicioSesion {
  form!:FormGroup;
  constructor(private formBuilder: FormBuilder){ 
    this.form=this.formBuilder.group(
      {
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
      }
    )
  }

  onEnviar(event:Event){
    console.log(this.form.value)
    event.preventDefault;
    if (this.form.valid){
      alert ("Enviar al servidor...")
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
