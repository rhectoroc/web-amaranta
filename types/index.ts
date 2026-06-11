export interface Excursion {
  id: string;
  slug: string;
  titulo: string;
  precioDesde: number;
  duracion: string;
  tipoViaje: 'familiar' | 'pareja' | 'grupos' | 'solo';
  imagenUrl: string;
  beneficios: string[];
}

export interface Testimonio {
  id: string;
  nombre: string;
  edad: number;
  tipoViaje: string;
  avatarUrl: string;
  calificacion: number;
  comentario: string;
}
