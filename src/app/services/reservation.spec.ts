import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    });
    service = TestBed.inject(ReservationService);
  });

  it('stores reservations and returns only those owned by a user', () => {
    service.addReservation({ id: 'one', productoId: 1, productoNombre: 'Cancha 1', fecha: '2026-10-20', hora: '18:00', precio: 60, usuario: 'ana@example.com' });
    service.addReservation({ id: 'two', productoId: 2, productoNombre: 'Cancha 2', fecha: '2026-10-20', hora: '19:00', precio: 90, usuario: 'luis@example.com' });

    expect(service.getReservationsForUser('ana@example.com')).toHaveLength(1);
    expect(service.getReservationsForUser('ana@example.com')[0].id).toBe('one');
  });

  it('rejects a duplicate court date and time slot', () => {
    service.addReservation({ id: 'one', productoId: 1, productoNombre: 'Cancha 1', fecha: '2026-10-20', hora: '18:00', precio: 60, usuario: 'ana@example.com' });

    expect(service.isSlotReserved(1, '2026-10-20', '18:00')).toBe(true);
  });

  it('removes only the reservation belonging to the requesting user', () => {
    service.addReservation({ id: 'one', productoId: 1, productoNombre: 'Cancha 1', fecha: '2026-10-20', hora: '18:00', precio: 60, usuario: 'ana@example.com' });

    expect(service.deleteReservation('one', 'luis@example.com')).toBe(false);
    expect(service.deleteReservation('one', 'ana@example.com')).toBe(true);
    expect(service.getReservations()).toEqual([]);
  });
});
