import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuienesSomosService {

  private profesionalList: { id: number, name: string; perfil: string, photo: string, 
    portfolio: string }[] = [
 ];

  constructor(private http: HttpClient) {  }

  obtenerProfecionales(): Observable<any> {
    return this.http.get("http://localhost:3000/Profesionales");
  }
  
}
