import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../services/user/user.service';
import { UserRequest } from '../../../shared/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent {
  readonly dialogRef = inject(MatDialogRef<UserModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  userService = inject(UserService);
  errors: any = {};

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  });

  onSave() {
    if (this.userForm.valid) {
      const userRequest: Partial<UserRequest> = this.userForm.value;

      this.userService.postUser(userRequest).subscribe({
        next: () => this.dialogRef.close(this.userForm.value),
        error: (error) => {
          console.log(error.error.errors);
          this.errors = {...error.error.errors};
        },
      });
      // this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
