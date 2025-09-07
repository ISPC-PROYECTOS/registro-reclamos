import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuienesSomosService } from '../../services/quienes-somos.service';

@Component({
  selector: 'app-sobre-nosotros',
  imports: [],
  templateUrl: './sobre-nosotros.html',
  styleUrl: './sobre-nosotros.css'
})
export class SobreNosotros implements OnInit{
  profesionalList: { id: number, name: string; perfil: string, photo: string, portfolio: string }[] = [];
  
  constructor(private quienesSomosService: QuienesSomosService){

  }
  ngOnInit(): void {
    this.profesionalList = this.quienesSomosService.obtenerProfecionales();
    
    throw new Error('Method not implemented.');
  }
}

