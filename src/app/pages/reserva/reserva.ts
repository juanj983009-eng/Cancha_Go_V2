import { DecimalPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product';
import { ReservationService } from '../../services/reservation';

@Component({
  selector: 'app-reserva',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css'
})
export class Reserva implements OnInit {

  readonly producto = signal<Product | null>(null);

  fecha = '';
  hora = '';
  readonly fechaMinima = new Date().toISOString().split('T')[0];

  readonly error = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('No se encontró el identificador de la cancha.');
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: producto => this.producto.set(producto),
      error: () => this.error.set('No se pudo encontrar la cancha.')
    });
  }

  confirmarReserva(): void {

    this.error.set('');

    if (!this.fecha || !this.hora) {
      this.error.set('Selecciona una fecha y una hora.');
      return;
    }

    if (this.fecha < this.fechaMinima) {
      this.error.set('Selecciona una fecha de hoy o posterior.');
      return;
    }

    const producto = this.producto();

    if (!producto) {
      this.error.set('No se encontró la información de la cancha.');
      return;
    }

    const usuario = this.authService.getUser();

    if (!usuario) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    if (this.reservationService.isSlotReserved(producto.id, this.fecha, this.hora)) {
      this.error.set('Esta cancha ya está reservada en la fecha y hora seleccionadas.');
      return;
    }

    const reserva = {
      id: Date.now().toString(),
      productoId: producto.id,
      productoNombre: producto.nombre,
      fecha: this.fecha,
      hora: this.hora,
      precio: producto.precio,
      usuario: usuario.correo
    };

    this.reservationService.addReservation(reserva);

    this.router.navigate(['/mis-reservas']);
  }

}
