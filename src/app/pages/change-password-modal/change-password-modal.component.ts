import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AuthService } from '../../services';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss',
})
export class ChangePasswordModalComponent {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  readonly dialogRef = inject(MatDialogRef);
}
