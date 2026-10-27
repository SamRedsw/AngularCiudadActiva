export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp?: string;
}

export interface UsuarioModel {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fotoUrl?: string;
  activo: boolean;
  rol: string;
  laboresActivas?: number;
  creadoEn?: string;
}

export interface UsuarioUpdateRequest {
  nombre?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  fotoUrl?: string;
  activo?: boolean;
}

export interface UsuarioCreateAdminRequest {
  nombre: string;
  email: string;
  password?: string;
  telefono?: string;
  direccion?: string;
  rol: string;
}

export interface AuthResponse {
  token: string;
  tipoToken?: string;
  tipo?: string;
  usuario?: UsuarioModel;
  id?: number;
  email?: string;
  nombre?: string;
  rol?: string;
}

export interface CategoriaModel {
  id: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
  activa?: boolean;
  totalReportes?: number;
  semaforo?: SemaforoModel;
}

export interface CategoriaCreateRequest {
  nombre: string;
  descripcion?: string;
  icono?: string;
}

export interface SemaforoModel {
  cantidadReportes: number;
  colorHex: string;
  colorNombre: string;
  nivelAlerta: string;
  descripcion: string;
  porcentajeSaturacion: number;
}

export interface ReporteResponse {
  id: number;
  titulo: string;
  descripcion: string;
  categoriaId?: number;
  categoriaNombre?: string;
  categoriaIcono?: string;
  ciudadanoId?: number;
  ciudadanoNombre?: string;
  direccion?: string;
  latitud?: number;
  longitud?: number;
  imagenUrl?: string;
  tieneFoto?: boolean;
  fotoTipo?: string;
  estado: string; // PENDIENTE, ADMITIDO, RECHAZADO, EN_PROCESO, ATENDIDO, CERRADO
  prioridad?: string; // BAJA, MEDIA, ALTA, CRITICA
  justificacionRechazo?: string;
  evidenciaCierreUrl?: string;
  tieneFotoSolucion?: boolean;
  operadorAsignadoNombre?: string;
  reportesCercanos?: number;
  semaforoColorHex?: string;
  semaforoNivel?: string;
  semaforoDescripcion?: string;
  creadoEn?: string;
  actualizadoEn?: string;
  fechaCierre?: string;
}

export interface ReporteCreateRequest {
  titulo: string;
  descripcion: string;
  categoriaId: number;
  latitud?: number;
  longitud?: number;
  direccion?: string;
  imagenUrl?: string;
}

export interface AsignacionModel {
  id: number;
  reporteId: number;
  reporteTitulo?: string;
  operadorId: number;
  operadorNombre?: string;
  gestorId?: number;
  gestorNombre?: string;
  notas?: string;
  activa: boolean;
  creadoEn?: string;
}

export interface AsignacionCreateRequest {
  operadorId: number;
  notas?: string;
}

export interface SeguimientoModel {
  id: number;
  reporteId?: number;
  reporteTitulo?: string;
  usuarioId?: number;
  usuarioNombre?: string;
  usuarioEmail?: string;
  usuarioRol?: string;
  estadoAnterior?: string;
  estadoNuevo?: string;
  accion?: string;
  observaciones?: string;
  evidenciaUrl?: string;
  hashTrazabilidad?: string;
  creadoEn?: string;
}

export interface ComentarioModel {
  id: number;
  reporteId: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioRol?: string;
  contenido: string;
  creadoEn?: string;
  actualizadoEn?: string;
}

export interface EstadisticasModel {
  totalReportes: number;
  reportesPorEstado: Record<string, number>;
  reportesPorCategoria: Record<string, number>;
  reportesPorPrioridad: Record<string, number>;
  tiempoPromedioAtencionHoras: number;
  reportesAtendidosOCerrados: number;
  reportesPendientes: number;
  semaforoGlobal?: SemaforoModel;
  semaforoPorCategoria: Record<string, SemaforoModel>;
}