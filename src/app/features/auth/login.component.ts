import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  passwordVisible = false;

  demoAccounts = [
    { label: 'Ciudadano', email: 'ciudadano@ciudadactiva.gov.co', pass: 'Ciudadano123!' },
    { label: 'Gestor', email: 'gestor@ciudadactiva.gov.co', pass: 'Gestor123!' },
    { label: 'Operador', email: 'operador@ciudadactiva.gov.co', pass: 'Operador123!' },
    { label: 'Admin', email: 'admin@ciudadactiva.gov.co', pass: 'Admin123!' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  selectDemoAccount(acc: { email: string; pass: string }) {
    this.loginForm.patchValue({
      email: acc.email,
      password: acc.pass
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data) {
          const auth = res.data;
          localStorage.setItem('jwt_token', auth.token);
          localStorage.setItem('user_role', auth.rol || auth.usuario?.rol || 'ROLE_CIUDADANO');
          localStorage.setItem('user_name', auth.nombre || auth.usuario?.nombre || '');
          
          // Redirección por Rol
          const role = auth.rol || auth.usuario?.rol;
          if (role === 'ROLE_GESTOR') this.router.navigate(['/gestor/dashboard']);
          else if (role === 'ROLE_OPERADOR') this.router.navigate(['/operador/tareas']);
          else if (role === 'ROLE_ADMIN') this.router.navigate(['/admin/panel']);
          else this.router.navigate(['/ciudadano/home']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Credenciales inválidas o problema de conexión con el servidor.';
      }
    });
  }
}