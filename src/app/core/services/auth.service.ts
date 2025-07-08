import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  private userService!: UserService;

  user$ = authState(this.auth).pipe(
    map(user => {
      if (user) {
        return { uid: user.uid, email: user.email };
      }
      return null;
    })
  );

  register(email: string, password: string, role: 'admin' | 'medecin' | 'secretaire'): Observable<void> {
  return from(createUserWithEmailAndPassword(this.auth, email, password).then(async (userCredential) => {
    await this.userService.createUserProfile({
      uid: userCredential.user.uid,
      email: userCredential.user.email || email,
      role: role
    });
  }));
}
  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password).then(() => {}));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    }));
  }

  isAuthenticated(): Observable<boolean> {
    return authState(this.auth).pipe(map(user => !!user));
  }
}
