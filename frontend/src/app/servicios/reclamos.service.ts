import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReclamosService {
  
  private reclamoList: { id: number, fechaHora: Date; estado: string, descripcion: string, 
    prioridad: string }[] = []
  
  constructor(private http: HttpClient) {  }

  mostrarReclamo(): Observable<any> {
    return this.http.get("data/reclamos.json");
  }
  
}
