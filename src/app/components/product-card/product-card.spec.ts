import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    component.producto = { id: 1, nombre: 'Cancha prueba', imagen: '', categoria: 'Fútbol 5', precio: 60, stock: 1 };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses a local sports image for the product category', () => {
    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(image.getAttribute('src')).toBe('/images/canchas/futbol-5.png');
  });

  for (const [categoria, teamSize] of [
    ['Fútbol 5', '5 jugadores por equipo'],
    ['Fútbol 7', '7 jugadores por equipo'],
    ['Fútbol 11', '11 jugadores por equipo'],
    ['Básquet', null],
  ]) {
    it(`keeps the ${categoria} badge compact and separates team-size guidance from the product name`, async () => {
      fixture.componentRef.setInput('producto', {
        id: 1, nombre: 'Cancha Premium', imagen: '', categoria, precio: 60, stock: 8,
      });
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.nativeElement.querySelector('.court-card__category').textContent.trim()).toBe(categoria);
      expect(fixture.nativeElement.querySelector('h2').textContent).toBe('Cancha Premium');
      expect(fixture.nativeElement.querySelector('.court-card__team-size')?.textContent.trim() ?? null).toBe(teamSize);
    });
  }
});
