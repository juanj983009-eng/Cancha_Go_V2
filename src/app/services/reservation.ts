import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Product } from '../models/product';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly storageKey = 'canchaGoReservations';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  getReservations(): Reservation[] {
    if (!this.isBrowser) return [];
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      const reservations = JSON.parse(data) as unknown;
      return Array.isArray(reservations) ? reservations as Reservation[] : [];
    } catch {
      return [];
    }
  }

  getReservationsForUser(correo: string): Reservation[] {
    return this.getReservations().filter(reserva => reserva.usuario === correo);
  }

  isSlotReserved(productoId: Product['id'], fecha: string, hora: string): boolean {
    return this.getReservations().some(reserva =>
      reserva.productoId === productoId && reserva.fecha === fecha && reserva.hora === hora
    );
  }

  addReservation(reservation: Reservation): void {
    const reservations = this.getReservations();

    reservations.push(reservation);

    this.saveReservations(reservations);
  }

  deleteReservation(id: string, usuario: string): boolean {
    const reservations = this.getReservations();
    const reservation = reservations.find(item => item.id === id);
    if (!reservation || reservation.usuario !== usuario) return false;

    this.saveReservations(reservations.filter(item => item.id !== id));
    return true;
  }

  private saveReservations(reservations: Reservation[]): void {
    if (this.isBrowser) localStorage.setItem(this.storageKey, JSON.stringify(reservations));
  }
}
