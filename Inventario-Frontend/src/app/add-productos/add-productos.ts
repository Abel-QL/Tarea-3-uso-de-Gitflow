import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-add-productos',
  templateUrl: './add-productos.html',
})
export class AddProductos {
  productos: Producto = new Producto();
  serverErrors = signal<string[]>([]);
  private productoService = inject(ProductoService);
  private router = inject(Router);

  onSubmit(form: NgForm) {
    this.serverErrors.set([]);
    if (form.invalid) {
      return;
    }
    this.saveProducto();
  }

  goListaProducto() {
    this.router.navigate(['/productos']);
  }

  saveProducto() {
    this.productoService.saveProducto(this.productos).subscribe({
      next: () => {
        this.goListaProducto();
      },
      error: (err) => {
        if (err.status === 400 && err.error && typeof err.error === 'object') {
          this.serverErrors.set(Object.values(err.error));
        } else {
          this.serverErrors.set(['Hubo un error al guardar el producto.']);
        }
      },
    });
  }
}
