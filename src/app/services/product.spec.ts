import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Product } from '../models/product';
import { ProductService } from './product';

describe('ProductService', () => {
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('is provided as an application service', () => {
    expect(TestBed.inject(ProductService)).toBeTruthy();
  });

  it('emits products returned by the REST endpoint', () => {
    const products = [{ id: 1, nombre: 'Cancha prueba', imagen: '', categoria: 'Fútbol 5', precio: 60, stock: 1 }];
    let result: Product[] = [];

    TestBed.inject(ProductService).getProducts().subscribe(data => result = data);
    const request = httpTesting.expectOne('http://localhost:3000/productos');
    request.flush(products);

    expect(result).toEqual(products);
  });
});
