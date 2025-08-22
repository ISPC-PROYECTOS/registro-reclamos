import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre-nosotros',
  imports: [],
  templateUrl: './sobre-nosotros.html',
  styleUrl: './sobre-nosotros.css'
})
export class SobreNosotros {
  profesionalList: { id: number, name: string; perfil: string, photo: string }[] = [
    { id:1, name: "Hebe Pereyra", perfil:"Desarrolladora", photo:"/Imagenes/foto-PereyraHebe.png"},
    { id:2, name: "Jorge Marchisone", perfil:"Analista", photo:"/Imagenes/foto-MarchisoneJorge.jpg"}, 
    { id:3, name: "Victoria Picco", perfil:"Scrum Master", photo:"/Imagenes/foto-PiccoVictoria.png"},
    { id:4, name: "Lautaro Barrera", perfil:"Desarrollador", photo:"/Imagenes/foto-BarreraLautaro.jpg"},
    { id:5, name: "Mariela Suarez", perfil:"Desarrolladora", photo:"/Imagenes/foto-SuarezMariela.png"}
    ];
}

