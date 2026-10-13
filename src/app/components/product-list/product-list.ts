import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  @Input() productos: Product[] = [];

  busqueda = '';
  categoriaSeleccionada = '';

  get categorias(): string[] {
    return [...new Set(this.productos.map(producto => producto.categoria))];
  }

  get productosFiltrados(): Product[] {
    return this.productos.filter(producto => {

      const coincideNombre =
        producto.nombre
          .toLowerCase()
          .includes(this.busqueda.toLowerCase());

      const coincideCategoria =
        this.categoriaSeleccionada === '' ||
        producto.categoria === this.categoriaSeleccionada;

      return coincideNombre && coincideCategoria;
    });
  }
}