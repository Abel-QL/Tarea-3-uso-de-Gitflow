import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private baseUrl = 'http://localhost:8080/api/productos';
  private clientHttp = inject(HttpClient);

  getProductoLista(): Observable<Producto[]> {
    return this.clientHttp.get<Producto[]>(this.baseUrl);
  }

  saveProducto(producto: Producto): Observable<Object> {
    return this.clientHttp.post(this.baseUrl, producto);
  }

  getProductoById(id: number) {
    return this.clientHttp.get<Producto>(this.baseUrl + '/' + id);
  }

  editProducto(id: number, producto: Producto) {
    return this.clientHttp.put(this.baseUrl + '/' + id, producto);
  }

  deleteProducto(id: number) {
    return this.clientHttp.delete(this.baseUrl + '/' + id);
  }
}
