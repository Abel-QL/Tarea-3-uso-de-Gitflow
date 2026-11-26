import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth/login';
  private http = inject(HttpClient);
  private router = inject(Router);

  isLoggedIn = signal<boolean>(!!sessionStorage.getItem('auth_token'));
  currentUser = signal<string | null>(sessionStorage.getItem('auth_user'));

  login(username: string, password: string): Observable<any> {
    this.clearSession();
    return this.http.post(this.authUrl, { username, password }).pipe(
      tap(() => {
        const token = btoa(`${username}:${password}`);
        sessionStorage.setItem('auth_token', token);
        sessionStorage.setItem('auth_user', username);
        this.isLoggedIn.set(true);
        this.currentUser.set(username);
      })
    );
  }

  getAuthHeader(): string | null {
    const token = sessionStorage.getItem('auth_token');
    return token ? `Basic ${token}` : null;
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  private clearSession(): void {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }
}
