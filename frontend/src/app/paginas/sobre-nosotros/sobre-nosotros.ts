import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sobre-nosotros.html',
  styleUrls: ['./sobre-nosotros.css']
})
export class SobreNosotros {
  // Lista de profesionales restaurada a su estado original
  profesionalList: { id: number; name: string; perfil: string; photo: string; portfolio: string }[] = [
    { id: 1, name: "Hebe Pereyra", perfil: "Desarrolladora", photo: "/Imagenes/foto-PereyraHebe.jpg", portfolio: "portfolios/portfolio-hebe/index.html" },
    { id: 2, name: "Jorge Marchisone", perfil: "Desarrollador", photo: "/Imagenes/foto-MarchisoneJorge.jpg", portfolio: "portfolios/portfolio-jorge/index.html" },
    { id: 3, name: "Victoria Picco", perfil: "Scrum Master", photo: "/Imagenes/foto-PiccoVictoria.jpg", portfolio: "portfolios/portfolio-victoria/portafolio.html" },
    { id: 4, name: "Lautaro Barrera", perfil: "Desarrollador", photo: "/Imagenes/foto-BarreraLautaro.jpg", portfolio: "portfolios/portfolio-lautaro/portfolio.html" },
    { id: 5, name: "Mariela Suarez", perfil: "Desarrolladora", photo: "/Imagenes/foto-SuarezMariela.jpg", portfolio: "portfolios/portfolio-mariela/portfolio.html" }
  ];
}