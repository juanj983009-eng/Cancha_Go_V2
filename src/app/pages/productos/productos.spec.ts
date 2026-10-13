import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { Productos } from './productos';

describe('Productos', () => {
  let component: Productos;
  let fixture: ComponentFixture<Productos>;
  let products$: Subject<Product[]>;

  const products: Product[] = [{
    id: 1,
    nombre: 'Cancha de prueba',
    imagen: '',
    categoria: 'Fútbol 5',
    precio: 60,
    stock: 1
  }];

  beforeEach(async () => {
    products$ = new Subject<Product[]>();

    await TestBed.configureTestingModule({
      imports: [Productos],
      providers: [{
        provide: ProductService,
        useValue: { getProducts: () => products$.asObservable() }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(Productos);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the products after the service emits them', async () => {
    products$.next(products);

    await new Promise(resolve => setTimeout(resolve));
    await fixture.whenStable();

    expect(component.productos()).toEqual(products);
    expect(component.cargando()).toBe(false);
    const page = fixture.nativeElement.textContent;
    expect(page).toContain('Cancha de prueba');
    expect(page).not.toContain('Cargando canchas...');
  });

  it('renders an error and stops loading when the service errors', async () => {
    products$.error(new Error('Network error'));

    await fixture.whenStable();

    const page = fixture.nativeElement.textContent;
    expect(page).toContain('No pudimos cargar las canchas.');
    expect(page).not.toContain('Cargando canchas...');
  });
});
