import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
// import { DashboardComponent } from './dashboard/dashboard.component'; // Décommentez quand vous aurez créé ce composant
import { authGuard } from './core/guards/auth-guard';
import { RegisterComponent } from './register/register';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] } // Décommentez plus tard
];
