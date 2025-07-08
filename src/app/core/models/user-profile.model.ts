// core/models/user-profile.model.ts
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'medecin' | 'secretaire';
}
