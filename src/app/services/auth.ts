import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';

export interface AuthUser {
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly storageKey = 'canchaGoUser';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly user = signal<AuthUser | null>(this.readStoredUser());

  login(correo: string, password: string): boolean {

    if (correo === 'admin@canchago.com' && password === '123456') {

      const usuario: AuthUser = {
        nombre: 'Administrador',
        correo
      };

      this.saveUser(usuario);
      this.user.set(usuario);

      return true;
    }

    return false;
  }

  isAuthenticated(): boolean {
    return this.user() !== null;
  }

  getUser(): AuthUser | null {
    return this.user();
  }

  logout(): void {
    if (this.isBrowser) localStorage.removeItem(this.storageKey);
    this.user.set(null);
  }

  private readStoredUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    try {
      const usuario = localStorage.getItem(this.storageKey);
      if (!usuario) return null;
      const parsed = JSON.parse(usuario) as AuthUser;
      return parsed?.nombre && parsed?.correo ? parsed : null;
    } catch {
      return null;
    }
  }

  private saveUser(usuario: AuthUser): void {
    if (this.isBrowser) localStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }
}
