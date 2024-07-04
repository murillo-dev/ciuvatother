import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ConfigService, JwtService } from '.';
import { tap } from 'rxjs';
import { User, Credential, loginResponse } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly url = inject(ConfigService).apiUrl();
  private jwtService = inject(JwtService);

  currentUser: WritableSignal<any | null> = signal(null);

  public isAuthenticated = this.currentUser() != null;

  constructor() {}

  login(credential: Credential) {
    return this.http
      .post<loginResponse>(`${this.url}/auth/login`, credential)
      .pipe(
        tap((response: loginResponse) => {
          this.jwtService.setAccessToken(response.access_token);
          this.jwtService.setRefreshToken(response.refresh_token);
          this.currentUser.set(response.data);
        })
      );
  }
}
