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
});
