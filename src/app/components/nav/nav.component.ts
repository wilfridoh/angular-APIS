import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: any;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('sebas@mail.com', '1').subscribe({
      next: (user) => {
        this.profile = user;
        this.token = user.email;//user.token;
        Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success');
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire('Error', 'Credenciales incorrectas', 'error');
        } else {
          Swal.fire('Error', 'No se pudo conectar al servidor', 'error');
        }
      },
    });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe((user) => {
      this.profile = user;
    });
  }
}
