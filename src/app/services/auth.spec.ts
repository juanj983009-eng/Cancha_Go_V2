import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    });
    service = TestBed.inject(AuthService);
  });

  it('persists the demo user after valid login and clears it on logout', () => {
    expect(service.login('admin@canchago.com', '123456')).toBe(true);
    expect(service.getUser()).toEqual({
      nombre: 'Administrador',
      correo: 'admin@canchago.com'
    });

    service.logout();

    expect(service.isAuthenticated()).toBe(false);
  });

  it('does not authenticate invalid credentials', () => {
    expect(service.login('other@canchago.com', 'incorrecta')).toBe(false);
    expect(service.getUser()).toBeNull();
  });

  it('does not access browser storage on the server', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
    });
    const serverService = TestBed.inject(AuthService);

    expect(serverService.isAuthenticated()).toBe(false);
    expect(serverService.getUser()).toBeNull();
  });
});
