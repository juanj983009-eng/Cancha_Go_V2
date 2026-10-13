import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Reservation } from '../../models/reservation';
import { AuthService } from '../../services/auth';
import { ReservationService } from '../../services/reservation';

@Component({
  selector: 'app-mis-reservas',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css'
})
export class MisReservas implements OnInit {

  reservas: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const usuario = this.authService.getUser();

    if (!usuario) {
      return;
    }

    this.reservas = this.reservationService.getReservationsForUser(usuario.correo);
  }

  eliminarReserva(id: string): void {

    const usuario = this.authService.getUser();

    if (!usuario || !this.reservationService.deleteReservation(id, usuario.correo)) {
      return;
    }

    this.reservas = this.reservas.filter(
      reserva => reserva.id !== id
    );
  }

}
