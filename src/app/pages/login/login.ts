import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  iniciarSesion(): void {

    this.error = '';

    if (!this.correo || !this.password) {
      this.error = 'Completa todos los campos.';
      return;
    }

    const autenticado = this.authService.login(
      this.correo,
      this.password
    );

    if (!autenticado) {
      this.error = 'Correo o contraseña incorrectos.';
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/dashboard');
  }

}
