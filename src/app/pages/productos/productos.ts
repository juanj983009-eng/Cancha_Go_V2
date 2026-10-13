import { Component, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { ProductList } from '../../components/product-list/product-list';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-productos',
  imports: [ProductList],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {

  readonly productos = signal<Product[]>([]);
  readonly cargando = signal(true);
  readonly error = signal('');

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: productos => {
          this.productos.set(productos);
          this.cargando.set(false);
        },
        error: () => {
          this.error.set('No pudimos cargar las canchas. Verifica que JSON Server esté ejecutándose.');
          this.cargando.set(false);
        }
      });
  }
}
