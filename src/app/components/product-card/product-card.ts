import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  @Input() producto!: Product;

  constructor(
    private router: Router
  ) {}

  reservar(): void {
    this.router.navigate([
      '/reserva',
      this.producto.id
    ]);
  }

}