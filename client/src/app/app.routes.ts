import { CanMatchFn, Router, Routes, UrlTree } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegistroComponent } from './core/auth/views/registro/registro.component';
import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UsuarioService } from './core/auth/services/usuario.service';
import { LoginComponent } from './core/auth/views/login/login.component';

const authGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.usuarioAutenticado.pipe(
    map((usuario) => {
      if(!usuario) return router.parseUrl('/login');

      return true;
    })
  );
};

const authUserGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.usuarioAutenticado.pipe(
    map((usuario) => {
      if(usuario) return router.parseUrl('/dashboard');

      return true;
    })
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',
    component: DashboardComponent,
    canMatch: [authGuard],
  },
  { path: 'registro', component: RegistroComponent, canMatch: [authUserGuard] },
  { path: 'login', component: LoginComponent, canMatch: [authUserGuard] },
];
