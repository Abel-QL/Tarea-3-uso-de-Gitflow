import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.html',
})
export class ProductoLista implements OnInit {
  productos = signal<Producto[]>([]);
  private productoService = inject(ProductoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getProductos();
  }

  private getProductos(): void {
    this.productoService.getProductoLista().subscribe({
      next: (data) => {
        this.productos.set(data);
      },
      error: (error: Error) => {
        console.error('Hubo un problema al obtener los datos, error: ', error);
      },
    });
  }

  editProductos(id: number) {
    this.router.navigate(['edit-productos', id]);
  }
  deleteProducto(id: number) {
    this.productoService.deleteProducto(id).subscribe({
      next: (data) => {
        this.getProductos();
      },
      error(error: Error) {
        console.log(error);
      },
    });
  }
}
