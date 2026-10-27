import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  ApiResponse, AuthResponse, UsuarioModel, UsuarioUpdateRequest, 
  CategoriaModel, CategoriaCreateRequest, ReporteResponse, ReporteCreateRequest, 
  AsignacionModel, AsignacionCreateRequest, SeguimientoModel, ComentarioModel, 
  EstadisticasModel, UsuarioCreateAdminRequest 
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://ciudadactiva-4ah7.onrender.com/api';

  constructor(private http: HttpClient) {}

  // Autenticación y Perfil
  login(credentials: { email: string; password: string }): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/auth/login`, credentials);
  }

  registrar(data: any): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/auth/register`, data);
  }

  getMiPerfil(): Observable<ApiResponse<UsuarioModel>> {
    return this.http.get<ApiResponse<UsuarioModel>>(`${this.baseUrl}/usuarios/me`);
  }

  updateMiPerfil(data: UsuarioUpdateRequest): Observable<ApiResponse<UsuarioModel>> {
    return this.http.put<ApiResponse<UsuarioModel>>(`${this.baseUrl}/usuarios/me`, data);
  }

  // Categorías
  getCategorias(): Observable<ApiResponse<CategoriaModel[]>> {
    return this.http.get<ApiResponse<CategoriaModel[]>>(`${this.baseUrl}/categorias`);
  }

  crearCategoria(data: CategoriaCreateRequest): Observable<ApiResponse<CategoriaModel>> {
    return this.http.post<ApiResponse<CategoriaModel>>(`${this.baseUrl}/categorias`, data);
  }

  // Reportes
  getReportes(categoriaId?: number, estado?: string, prioridad?: string): Observable<ApiResponse<ReporteResponse[]>> {
    let params = new HttpParams();
    if (categoriaId) params = params.set('categoriaId', categoriaId.toString());
    if (estado) params = params.set('estado', estado);
    if (prioridad) params = params.set('prioridad', prioridad);
    return this.http.get<ApiResponse<ReporteResponse[]>>(`${this.baseUrl}/reportes`, { params });
  }

  getMisReportes(): Observable<ApiResponse<ReporteResponse[]>> {
    return this.http.get<ApiResponse<ReporteResponse[]>>(`${this.baseUrl}/reportes/mis-reportes`);
  }

  getReporteDetalle(id: number): Observable<ApiResponse<ReporteResponse>> {
    return this.http.get<ApiResponse<ReporteResponse>>(`${this.baseUrl}/reportes/${id}`);
  }

  crearReporte(data: ReporteCreateRequest): Observable<ApiResponse<ReporteResponse>> {
    return this.http.post<ApiResponse<ReporteResponse>>(`${this.baseUrl}/reportes`, data);
  }

  crearReporteConFoto(formData: FormData): Observable<ApiResponse<ReporteResponse>> {
    return this.http.post<ApiResponse<ReporteResponse>>(`${this.baseUrl}/reportes/con-foto`, formData);
  }

  eliminarReporte(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/reportes/${id}`);
  }

  // Gestión (Gestor / Admin)
  validarReporte(id: number, body: { admitido: boolean; justificacion?: string; prioridad?: string }): Observable<ApiResponse<ReporteResponse>> {
    return this.http.patch<ApiResponse<ReporteResponse>>(`${this.baseUrl}/reportes/${id}/validar`, body);
  }

  asignarOperador(id: number, body: AsignacionCreateRequest): Observable<ApiResponse<AsignacionModel>> {
    return this.http.post<ApiResponse<AsignacionModel>>(`${this.baseUrl}/reportes/${id}/asignaciones`, body);
  }

  getAsignacionesActivas(): Observable<ApiResponse<AsignacionModel[]>> {
    return this.http.get<ApiResponse<AsignacionModel[]>>(`${this.baseUrl}/asignaciones`);
  }

  getOperadores(): Observable<ApiResponse<UsuarioModel[]>> {
    return this.http.get<ApiResponse<UsuarioModel[]>>(`${this.baseUrl}/operadores`);
  }

  // Operaciones de Campo
  getMisAsignaciones(): Observable<ApiResponse<AsignacionModel[]>> {
    return this.http.get<ApiResponse<AsignacionModel[]>>(`${this.baseUrl}/asignaciones/mis-asignaciones`);
  }

  registrarAvance(id: number, body: { nuevoEstado?: string; accion: string; observaciones: string }): Observable<ApiResponse<SeguimientoModel>> {
    return this.http.post<ApiResponse<SeguimientoModel>>(`${this.baseUrl}/reportes/${id}/seguimientos`, body);
  }

  cerrarReporte(id: number, body: { evidenciaCierreUrl: string; observaciones?: string }): Observable<ApiResponse<ReporteResponse>> {
    return this.http.patch<ApiResponse<ReporteResponse>>(`${this.baseUrl}/reportes/${id}/cerrar`, body);
  }

  subirFotoSolucion(id: number, formData: FormData): Observable<ApiResponse<ReporteResponse>> {
    return this.http.post<ApiResponse<ReporteResponse>>(`${this.baseUrl}/reportes/${id}/foto-solucion`, formData);
  }

  // Comentarios
  getComentarios(reporteId: number): Observable<ApiResponse<ComentarioModel[]>> {
    return this.http.get<ApiResponse<ComentarioModel[]>>(`${this.baseUrl}/reportes/${reporteId}/comentarios`);
  }

  agregarComentario(reporteId: number, contenido: string): Observable<ApiResponse<ComentarioModel>> {
    return this.http.post<ApiResponse<ComentarioModel>>(`${this.baseUrl}/reportes/${reporteId}/comentarios`, { contenido });
  }

  // Estadísticas y Admin
  getEstadisticas(): Observable<ApiResponse<EstadisticasModel>> {
    return this.http.get<ApiResponse<EstadisticasModel>>(`${this.baseUrl}/estadisticas/reportes`);
  }

  getUsuarios(): Observable<ApiResponse<UsuarioModel[]>> {
    return this.http.get<ApiResponse<UsuarioModel[]>>(`${this.baseUrl}/admin/usuarios`);
  }

  crearUsuarioAdmin(data: UsuarioCreateAdminRequest): Observable<ApiResponse<UsuarioModel>> {
    return this.http.post<ApiResponse<UsuarioModel>>(`${this.baseUrl}/admin/usuarios`, data);
  }

  getAuditoriaRUP(): Observable<ApiResponse<SeguimientoModel[]>> {
    return this.http.get<ApiResponse<SeguimientoModel[]>>(`${this.baseUrl}/admin/auditoria`);
  }
}