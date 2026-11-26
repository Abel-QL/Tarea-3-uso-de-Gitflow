import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterModule],
})
export class App {
  protected readonly title = signal('inventario-app');
  authService = inject(AuthService);
  router = inject(Router);
}
