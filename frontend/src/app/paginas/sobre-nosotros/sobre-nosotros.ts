import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './sobre-nosotros.html',
  styleUrls: ['./sobre-nosotros.css']
})
export class SobreNosotros {
  profesionalList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/assets/data/profesionales.json').subscribe(data => {
      this.profesionalList = data;
    });
  }
}
