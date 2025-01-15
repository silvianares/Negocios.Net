import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NegociosComponent } from './negocios/negocios.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

// Definir las rutas de la aplicación
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige al componente de Negocios por defecto
  { path: 'negocios', component: NegociosComponent },  // Ruta al componente de negocios
  { path: 'login', component: LoginComponent },  // Ruta al componente de Login
  { path: '**', component: NotFoundComponent }  // Ruta para manejar rutas no definidas (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura las rutas definidas
  exports: [RouterModule]  // Exporta el RouterModule para usarlo en otras partes de la aplicación
})
export class AppRoutingModule { }