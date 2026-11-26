import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  errorMessage = signal<string>('');

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(): void {
    this.errorMessage.set('');

    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage.set('Debe ingresar usuario y contraseña.');
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.error || 'Credenciales inválidas. Verifique sus datos.');
      },
    });
  }
}
