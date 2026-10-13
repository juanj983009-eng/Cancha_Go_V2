import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, AuthUser } from '../../services/auth';
import { ReservationService } from '../../services/reservation';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  usuario: AuthUser | null = null;
  cantidadReservas = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();

    if (this.usuario) {
      this.cantidadReservas = this.reservationService.getReservationsForUser(this.usuario.correo).length;
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
