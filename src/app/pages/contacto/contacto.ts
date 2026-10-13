import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  nombre = '';
  correo = '';
  mensaje = '';
  enviado = false;

  enviarFormulario(): void {
    if (!this.nombre || !this.correo || !this.mensaje) {
      return;
    }

    this.enviado = true;
  }

}