import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

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

  it('renders the six local sports categories', () => {
    fixture.detectChanges();

    const categories = Array.from(
      fixture.nativeElement.querySelectorAll('.home-category')
    ) as HTMLElement[];

    expect(categories.map((category) => category.textContent?.trim())).toEqual([
      'Fútbol 5',
      'Fútbol 7',
      'Fútbol 11',
      'Básquet',
      'Vóley',
      'Pádel'
    ]);
    expect(
      fixture.nativeElement.querySelectorAll('.home-category img[src^="/images/canchas/"]').length
    ).toBe(6);
  });
});
