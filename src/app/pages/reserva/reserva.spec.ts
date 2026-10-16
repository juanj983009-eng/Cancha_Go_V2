import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Reserva } from './reserva';

describe('Reserva', () => {
  let component: Reserva;
  let fixture: ComponentFixture<Reserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reserva],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Reserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the selected court image in the reservation summary', () => {
    component.producto.set({
      id: 1,
      nombre: 'Cancha Fútbol 5',
      imagen: 'ignored-by-local-visual-mapping',
      categoria: 'Fútbol 5',
      precio: 60,
      stock: 1
    });
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector(
      '.reservation-summary__media img'
    ) as HTMLImageElement | null;

    expect(image?.getAttribute('src')).toBe('/images/canchas/futbol-5.png');
    expect(image?.getAttribute('alt')).toBe('Cancha Fútbol 5');
  });
});
