import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ReporteResponse, UsuarioModel } from '../../core/models/models';

@Component({
  selector: 'app-gestor-inspeccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestor-inspeccion.component.html',
  styleUrls: ['./gestor-inspeccion.component.scss']
})
export class GestorInspeccionComponent implements OnInit {
  reporteId!: number;
  reporte: ReporteResponse | null = null;
  operadores: UsuarioModel[] = [];
  prioridadSeleccionada = 'ALTA';
  
  // Modales y Reglas
  mostrarModalRechazo = false;
  motivoRechazo = '';
  mostrarModalAsignar = false;
  operadorSeleccionadoId: number | null = null;
  notasAsignacion = '';
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.reporteId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDetalle();
  }

  cargarDetalle(): void {
    this.apiService.getReporteDetalle(this.reporteId).subscribe(res => {
      if (res.success && res.data) {
        this.reporte = res.data;
      }
    });

    this.apiService.getOperadores().subscribe(res => {
      if (res.success && res.data) {
        this.operadores = res.data;
      }
    });
  }

  // RN01: Rechazo con Justificación Obligatoria
  confirmarRechazo(): void {
    if (!this.motivoRechazo.trim()) {
      this.errorMessage = 'RN01: La justificación técnica de rechazo es obligatoria.';
      return;
    }

    this.apiService.validarReporte(this.reporteId, {
      admitido: false,
      justificacion: this.motivoRechazo
    }).subscribe(res => {
      if (res.success) {
        this.router.navigate(['/gestor/dashboard']);
      }
    });
  }

  // RN02: Priorización por Gestor
  admitirYPriorizar(): void {
    this.apiService.validarReporte(this.reporteId, {
      admitido: true,
      prioridad: this.prioridadSeleccionada,
      justificacion: 'Admitido oficialmente por Gestor'
    }).subscribe(res => {
      if (res.success) {
        this.mostrarModalAsignar = true;
      }
    });
  }

  confirmarAsignacion(): void {
    const opId = this.operadorSeleccionadoId || this.operadores[0]?.id;
    if (!opId) return;

    this.apiService.asignarOperador(this.reporteId, {
      operadorId: opId,
      notas: this.notasAsignacion
    }).subscribe(res => {
      if (res.success) {
        this.router.navigate(['/gestor/dashboard']);
      }
    });
  }
}