import { Injectable, signal } from '@angular/core';
import test from 'node:test';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  jwtToken = signal<string | null>(null);
  jwtRefreshToken = signal<string | null>(null);

  constructor() {}

  private isLocalStorageAvalaible(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  getAccessToken(): string | null {
    if (this.isLocalStorageAvalaible()) {
      return localStorage.getItem('access_token');
    } else {
      return null;
    }
  }

  getRefreshToken(): string | null {
    if (this.isLocalStorageAvalaible()) {
      return localStorage.getItem('refresh_token');
    } else {
      return null;
    }
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.jwtToken.set(token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
    this.jwtRefreshToken.set(token);
  }

  clear(): void {
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('access_token');
    this.jwtToken.set(null);
    this.jwtRefreshToken.set(null);
  }
}
