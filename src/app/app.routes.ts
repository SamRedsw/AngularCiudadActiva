import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { GestorDashboardComponent } from './features/gestor/gestor-dashboard.component';
import { GestorInspeccionComponent } from './features/gestor/gestor-inspeccion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'gestor/dashboard', component: GestorDashboardComponent },
  { path: 'gestor/inspeccion/:id', component: GestorInspeccionComponent },
  { path: '**', redirectTo: 'login' }
];