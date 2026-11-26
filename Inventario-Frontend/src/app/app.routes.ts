import { Routes } from '@angular/router';
import { ProductoLista } from './producto-lista/producto-lista';
import { AddProductos } from './add-productos/add-productos';
import { EditProductos } from './edit-productos/edit-productos';
import { Login } from './login/login';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'productos', component: ProductoLista, canActivate: [authGuard] },
  { path: 'add-productos', component: AddProductos, canActivate: [authGuard] },
  { path: 'edit-productos/:id', component: EditProductos, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
