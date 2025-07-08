import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
/*import { HomeComponent } from './home/home';
import { PatientsComponent } from './patients/patients';
import { RendezvousComponent } from './rendezvous/rendezvous';
import { ParametresComponent } from './parametres/parametres';*/

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
     /* { path: 'home', component: HomeComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'rendezvous', component: RendezvousComponent },
      { path: 'parametres', component: ParametresComponent },*/
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
