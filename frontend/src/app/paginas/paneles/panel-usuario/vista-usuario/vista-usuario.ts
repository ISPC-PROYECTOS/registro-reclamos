import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CargarReclamo } from '../cargar-reclamo/cargar-reclamo';
import { ReclamosService } from '../../../../servicios/reclamos.service';
import { Subscriber } from 'rxjs';
@Component({
  selector: 'app-vista-usuario',
  imports: [RouterLink],
  templateUrl: './vista-usuario.html',
  styleUrl: './vista-usuario.css'
})
export class VistaUsuario  implements OnInit{
  reclamoList: { id: number, fechaHora: Date; estado: string, descripcion: string, 
    prioridad: string }[] = [];

  constructor(private reclamosService: ReclamosService) { }
    ngOnInit(): void {
    this.reclamosService.mostrarReclamo().subscribe({
      next: (data) => {
        // Asigna los datos a la lista de reclamos.
        // Asegúrate de que la propiedad 'reclamos' exista en la respuesta de la API.
        this.reclamoList = data["reclamos"];
        console.log("Reclamos cargados:", this.reclamoList);
      },
      error: (error) => {
        console.error("Error al obtener los reclamos:", error);
      },
      complete: () => {
        console.info('Carga de reclamos completada.');
      }
    })
  }

}
