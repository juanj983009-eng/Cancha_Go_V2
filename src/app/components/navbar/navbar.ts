import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  menuAbierto = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get autenticado(): boolean {
    return this.authService.isAuthenticated();
  }

  cambiarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.cerrarMenu();
    this.router.navigate(['/']);
  }

}
