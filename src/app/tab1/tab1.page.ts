import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonChip,
  IonLabel,
  IonRow,
  IonRange,
  IonGrid,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pin, arrowBack, arrowForward } from 'ionicons/icons';
import { Geolocation, Position } from '@capacitor/geolocation';
import * as mapboxgl from 'mapbox-gl';
import { ITipo } from '../interfaces/tipo.interface';
import { NegociosService } from '../services/negocios.service';
import { INegocio } from '../interfaces/negocio.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonChip,
    IonLabel,
    IonRow,
    IonRange,
    IonGrid,
    IonButton
  ]
})
export class Tab1Page {
  private negociosService = inject(NegociosService);
  tipos: ITipo[] = [];
  tipoElegido: number = 0;
  isToastOpen = false;
  mensaje = '';
  radio: number | object = 0;
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  negocios: INegocio[] = [];
  mapboxToken = environment.accessToken;
  markers: mapboxgl.Marker[] = [];

  constructor() {
    addIcons({ pin, arrowBack, arrowForward });
  }

  async ngOnInit() {
    this.getTipos();
    const infoGeolicalizacion = await Geolocation.getCurrentPosition();
    // const bounds = new LatLngBounds(arrayLatLng);
    this.map = new mapboxgl.Map({
      accessToken: this.mapboxToken,
      container: 'mapa',
      style: this.style,
      zoom: 14,
      center: [infoGeolicalizacion.coords.longitude, infoGeolicalizacion.coords.latitude]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  getTipos() {
    this.negociosService.getTipos().subscribe({
      next: (data) => {
        this.tipos = data;
        this.tipoElegido = this.tipos[0].idTipo;
      },
      error: (err) => {
        this.isToastOpen = true;
        this.mensaje = 'Se ha producido un erro en la carga de tipos';
      }
    });
  }

  selectTipo(idTipo: number) {
    this.tipoElegido = idTipo;
  }

  getNegocios(radio: number | object) {
    this.radio = radio;
    this.obtenerPosicion();
  }

  async obtenerPosicion() {
    try {
      const infoGeolicalizacion = await Geolocation.getCurrentPosition();
      this.getNegociosMapa(infoGeolicalizacion);
    } catch (error) {
      this.mensaje = 'Error en el acceso a la geolocalización';
      this.isToastOpen = true;
    }
  }

  getNegociosMapa(geoPos: Position) {
    this.negociosService
      .getNegociosRadio(geoPos.coords.latitude, geoPos.coords.longitude, this.tipoElegido, Number(this.radio))
      .subscribe({
        next: (data) => {
          this.negocios = data;
          this.markers.forEach((x) => x.remove());
          this.markers.length = 0;
          const marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([geoPos.coords.longitude, geoPos.coords.latitude])
            .addTo(this.map); // Añadir mi posición
          this.markers.push(marker);
          this.dibujarMapa();
        },
        error: (err) => {
          this.mensaje = 'Error de acceso los negocios';
          this.isToastOpen = true;
        }
      });
  }

  dibujarMapa() {
    // Crear un objeto bounds para calcular los límites
    const bounds = new mapboxgl.LngLatBounds();

    this.negocios.forEach((x) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([x.lng, x.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // Crear un popup asociado
            .setHTML(`<h3>${x.nombre}</h3><p>${x.descripcion}</p><p>${x.direccion}</p>`)
        )
        .addTo(this.map); // Añadir el marcador al mapa

      bounds.extend([x.lng, x.lat]);
      // Agregar el marcador al array
      this.markers.push(marker);
      this.map.fitBounds(bounds, {
        padding: 50, // Espacio entre los límites y el borde del mapa
        maxZoom: 14, // Zoom máximo permitido
        duration: 1000 // Duración de la animación en milisegundos
      });
    });
  }

  setOpen(isOpen: boolean) {
    this.mensaje = '';
    this.isToastOpen = isOpen;
  }
}

