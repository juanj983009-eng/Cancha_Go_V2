import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';
import database from '../../../../db.json';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders only the categories present in the catalogue', () => {
    fixture.detectChanges();

    const categories = Array.from(
      fixture.nativeElement.querySelectorAll('.home-category')
    ) as HTMLElement[];

    const catalogueCategories = [...new Set(database.productos.map(product => product.categoria))];
    expect(categories.map((category) => (category.querySelector('strong') ?? category).textContent?.trim())).toEqual(catalogueCategories);
    expect(
      fixture.nativeElement.querySelectorAll('.home-category img[src^="/images/canchas/"]').length
    ).toBe(catalogueCategories.length);
  });
});
