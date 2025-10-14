import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sobre-nosotros.html',
  styleUrl: './sobre-nosotros.css',
})
export class SobreNosotros implements OnInit {
  profesionalList: {
    id: number;
    name: string;
    perfil: string;
    photo: string;
    portfolio: string;
  }[] = [];

  constructor(private quienesSomosService: QuienesSomosService) {}
  ngOnInit(): void {
    this.quienesSomosService.obtenerProfesionales().subscribe({
      next: (data) => {
        console.log(data);
        this.profesionalList = data;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });

    throw new Error('Method not implemented.');
  }
}

