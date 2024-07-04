import { Component, inject } from '@angular/core';
import { AuthService } from '../../services';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Credential } from '../../shared/models';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  currenUser = this.authService.currentUser;

  constructor(private snackBar: MatSnackBar) {}

  onLogin() {
    console.log('on login');
    if (this.loginForm.valid) {
      console.log('esta validado');
      this.authService
        .login(this.loginForm.value as Credential)
        .subscribe((response) => {
          if (response.status === 'success') {
            this.snackBar.open('Usuario Logueado con exito.', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          } else {
            // display error message
          }
        });
    } else {
      // display error message
    }
  }
}