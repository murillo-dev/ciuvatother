import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ConfigService } from '../config.service';
import { tap } from 'rxjs';
import { User } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private url: string = inject(ConfigService).apiUrl();
  users: WritableSignal<User[]> = signal<User[]>([]);

  constructor() {

    this.getUsers().subscribe((data) => console.log(data));
  }

  getUsers() {
    return this.http.get(`${this.url}/users`).pipe(
      tap((response: any) => {
        this.users.set(response);
      })
    );
  }

}
