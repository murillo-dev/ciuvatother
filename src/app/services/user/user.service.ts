import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { tap } from 'rxjs';
import { User } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private url: string = inject(ConfigService).apiUrl();
  users: WritableSignal<User[]> = signal<User[]>([]);

  constructor() {
    this.getUsers().subscribe();
  }

  getUsers() {
    return this.http.get<Array<User>>(`${this.url}/users`).pipe(
      tap((users) => {
        this.users.set(users);
      })
    );
  }
}
