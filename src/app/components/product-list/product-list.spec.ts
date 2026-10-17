import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { provideRouter } from '@angular/router';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clarifies team sizes while filtering with original category values', async () => {
    fixture.componentRef.setInput('productos', [
      { id: 1, nombre: 'Cancha A', imagen: '', categoria: 'Fútbol 5', precio: 60, stock: 8 },
      { id: 2, nombre: 'Cancha B', imagen: '', categoria: 'Fútbol 7', precio: 90, stock: 5 },
      { id: 3, nombre: 'Cancha C', imagen: '', categoria: 'Fútbol 11', precio: 150, stock: 3 },
      { id: 4, nombre: 'Cancha D', imagen: '', categoria: 'Básquet', precio: 70, stock: 6 },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(Array.from(select.options).map(option => [option.value, option.textContent?.trim()])).toEqual([
      ['', 'Todas las categorías'],
      ['Fútbol 5', 'Fútbol 5 · 5 jugadores por equipo'],
      ['Fútbol 7', 'Fútbol 7 · 7 jugadores por equipo'],
      ['Fútbol 11', 'Fútbol 11 · 11 jugadores por equipo'],
      ['Básquet', 'Básquet'],
    ]);
    select.value = 'Fútbol 7';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.categoriaSeleccionada).toBe('Fútbol 7');
    expect(fixture.nativeElement.querySelectorAll('app-product-card').length).toBe(1);
    expect(fixture.nativeElement.querySelector('app-product-card h2').textContent).toBe('Cancha B');
  });
});
