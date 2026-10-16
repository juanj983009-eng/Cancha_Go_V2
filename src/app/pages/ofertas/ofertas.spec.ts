import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Ofertas } from './ofertas';

describe('Ofertas', () => {
  let component: Ofertas;
  let fixture: ComponentFixture<Ofertas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ofertas],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Ofertas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('presents each promotion with a local court image', () => {
    fixture.detectChanges();

    const images = Array.from(
      fixture.nativeElement.querySelectorAll('.offer-card img')
    ) as HTMLImageElement[];

    expect(images).toHaveLength(3);
    expect(images.map((image) => image.getAttribute('src'))).toEqual([
      '/images/canchas/futbol-5.png',
      '/images/canchas/futbol-7.png',
      '/images/canchas/futbol-11.png'
    ]);
  });
});
