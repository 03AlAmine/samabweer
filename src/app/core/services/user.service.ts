import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, switchMap, of } from 'rxjs';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'medecin' | 'secretaire';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserProfile$: Observable<UserProfile | null>;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.currentUserProfile$ = user(this.auth).pipe(
      switchMap(user => {
        if (user) {
          return docData(doc(this.firestore, `users/${user.uid}`)) as Observable<UserProfile>;
        }
        return of(null);
      })
    );
  }

  async createUserProfile(user: UserProfile): Promise<void> {
    return setDoc(doc(this.firestore, `users/${user.uid}`), {
      ...user
    });
  }
}
