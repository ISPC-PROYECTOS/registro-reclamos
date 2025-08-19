import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './compartido/footer/footer';
import { Header } from './compartido/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
