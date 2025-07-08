import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading: boolean = false;
  emailSent: boolean = false;

  constructor(
    private auth: Auth,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async resetPassword() {
    if (!this.email) {
      this.snackBar.open('Veuillez entrer votre email', 'Fermer', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.emailSent = true;
      this.snackBar.open('Email de réinitialisation envoyé', 'Fermer', { duration: 3000 });
    } catch (error: any) {
      this.snackBar.open(this.getErrorMessage(error.code), 'Fermer', { duration: 3000 });
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Email invalide';
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cet email';
      default:
        return 'Erreur lors de l\'envoi de l\'email';
    }
  }
}
