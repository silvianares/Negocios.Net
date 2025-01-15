import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirigir a otra página después de un login exi
import { ILogin } from '../interfaces/login.interface';
import { NegociosService } from '../services/negocios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
    standalone: true,
   // Añadir el archivo de estilo si es necesario

})
export class LoginComponent {
  // Propiedades para el nombre de usuario y la contraseña
  email: string = '';  // Variable para el nombre de usuario
  password: string = '';  // Variable para la contraseña
  loginFailed: boolean = false;  // Flag para manejar el estado de fallo de login

  constructor(private router: Router) { }  // Inyecta el servicio Router para redirigir al usuario
  private negociosService = inject(NegociosService);
  // Método para manejar el envío del formulario
  onSubmit() {
    // Aquí validamos las credenciales (esto es un ejemplo simple)
    const infoLogin: ILogin = {
      email: this.email, 
      password: this.password
    }
            // Si las credenciales son correctas, redirigimos al usuario
            console.log(infoLogin)
            this.negociosService.login(infoLogin).subscribe({
              next: (data) => {
                
                localStorage.setItem('usuario', JSON.stringify(data));
      
              
                this.router.navigateByUrl('negocios', {replaceUrl:true});
              },
              error: (err) => {
               
                alert ('Credenciales erróneas');              }
            });
      
      // Mensaje de éxito (puedes eliminar esto en producción)
    
}}
