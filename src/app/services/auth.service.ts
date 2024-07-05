import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ConfigService, JwtService } from '.';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Credential, LoginResponse, User } from '../shared/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly url = inject(ConfigService).apiUrl();
  private jwtService = inject(JwtService);
  private router = inject(Router);

  currentUser: WritableSignal<User | null> = signal(null);

  public isAuthenticated = this.currentUser() != null;

  // constructor() {
  //   if(this.jwtService.jwtToken()) {
  //     this.http.get<User>(`${this.url}/auth/get-user`).subscribe((user) => {
  //       if (user) {
  //         this.currentUser.set(user);
  //         this.router.navigate(['']);
  //       } else {
  //         this.router.navigate(['login']);
  //       }
  //     });
  //   }
  // }

  login(credential: Credential) {
    return this.http
      .post<LoginResponse>(`${this.url}/auth/login`, credential)
      .pipe(
        tap((response: LoginResponse) => {
          this.jwtService.setAccessToken(response.access_token);
          this.jwtService.setRefreshToken(response.refresh_token);
          this.currentUser.set(response.data);
        })
      );
  }

  validateToken() {
    return this.http.get<LoginResponse>(`${this.url}/auth/refresh`).pipe(
      tap((response: LoginResponse) => {
        this.jwtService.setAccessToken(response.access_token);
        this.jwtService.setRefreshToken(response.refresh_token);
        this.currentUser.set(response.data);
      })
    );
  }

  isAuthenticatedFn(): Observable<boolean> {
    console.log('isAuthenticatedFn');
    if (this.jwtService.jwtToken() !== null) {
      return this.http.get<User>(`${this.url}/auth/get-user`).pipe(
        map((reponse: User) => {
          if (reponse) {
            this.currentUser.set(reponse);
            this.router.navigate(['']);
            return true;
          } else {
            this.currentUser.set(null);
            return false;
          }
        }),
        catchError(() => {
          this.currentUser.set(null);
          return of(false);
        })
      );
    }else {
      this.currentUser.set(null);
      return of(true);
    }
  }
}
