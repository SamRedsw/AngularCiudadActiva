import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ReporteResponse, AsignacionModel, EstadisticasModel } from '../../core/models/models';

@Component({
  selector: 'app-gestor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestor-dashboard.component.html',
  styleUrls: ['./gestor-dashboard.component.scss']
})
export class GestorDashboardComponent implements OnInit {
  pendientes: ReporteResponse[] = [];
  asignaciones: AsignacionModel[] = [];
  stats: EstadisticasModel | null = null;
  reporteCritico: ReporteResponse | null = null;
  isLoading = true;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;

    this.apiService.getReportes(undefined, 'PENDIENTE').subscribe(res => {
      if (res.success && res.data) {
        this.pendientes = res.data;
        this.reporteCritico = this.pendientes.find(r => r.prioridad === 'CRITICA') || this.pendientes[0] || null;
      }
    });

    this.apiService.getAsignacionesActivas().subscribe(res => {
      if (res.success && res.data) {
        this.asignaciones = res.data;
      }
    });

    this.apiService.getEstadisticas().subscribe(res => {
      if (res.success && res.data) {
        this.stats = res.data;
      }
      this.isLoading = false;
    });
  }

  inspeccionar(id: number): void {
    this.router.navigate(['/gestor/inspeccion', id]);
  }
}