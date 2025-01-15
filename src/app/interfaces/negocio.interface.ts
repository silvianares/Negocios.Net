export interface INegocio {
    idNegocio?: number;
    nombre: string;
    direccion: string;
    descripcion: string;
    lat: number;
    lng: number;
    tiposIdTipo: number;
    tiposDescripcion?: string;
  }