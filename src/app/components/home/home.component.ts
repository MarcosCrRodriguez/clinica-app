import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  irALogin() {
    this.router.navigate(['/login']); // Cambia '/login' por la ruta correcta de tu aplicación
  }

  irARegistro() {
    this.router.navigate(['/registro']); // Cambia '/registro' por la ruta correcta de tu aplicación
  }
}
