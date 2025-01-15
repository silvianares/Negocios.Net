import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NegociosService } from '../services/negocios.service';
import { INegocio } from '../interfaces/negocio.interface';
import { ITipo } from '../interfaces/tipo.interface';

@Component({
  selector: 'app-negocios',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, Dialog, ConfirmDialog],
  standalone: true,
  templateUrl: './negocios.component.html',
  styleUrl: './negocios.component.css',
  providers: [ConfirmationService]
})
export class NegociosComponent {
  @ViewChild('formulario') formulario!: NgForm;
  private negociosService = inject(NegociosService);
  private confirmationService = inject(ConfirmationService);

  visibleError = false;
  mensajeError = '';
  negocios: INegocio[] = [];
  tipos: ITipo[] = [];
  visibleConfirm = false;

  negocio: INegocio = {
    idNegocio: 0,
    nombre: '',
    descripcion: '',
    direccion: '',
    lat: 0,
    lng: 0,
    tiposIdTipo: 1
  };

  ngOnInit(): void {
    this.getTipos();
    this.getNegocios();
  }

  getTipos() {
    this.negociosService.getTipos().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.tipos = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.mensajeError = 'Se ha producido un erro en la carga de tipos';
      }
    });
  }

  getNegocios() {
    this.negociosService.getNegocios().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.negocios = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.mensajeError = 'Se ha producido un erro en la carga de negocios';
      }
    });
  }

  guardar() {
    this.negociosService.addNegocio(this.negocio).subscribe({
      next: (data: any) => {
        this.visibleError = false;
        this.formulario.reset();
        this.getNegocios();
      },
      error: (err: any) => {
        this.visibleError = true;
        this.mensajeError = err.error.msg;
      }
    });
  }

  confirmDelete(negocio: INegocio) {
    this.confirmationService.confirm({
      message: `Eliminar el negocio ${negocio.nombre}?`,
      header: 'Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí´',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteNegocio(negocio.idNegocio!)
    });
  }

  deleteNegocio(id: number) {
    this.negociosService.deleteNegocio(id).subscribe({
      next: (data: INegocio) => {
        this.visibleError = false;
        this.getNegocios();
      },
      error: (err: any) => {
        this.visibleError = true;
        this.mensajeError = err.error.msg;
      }
    });
  }
}
