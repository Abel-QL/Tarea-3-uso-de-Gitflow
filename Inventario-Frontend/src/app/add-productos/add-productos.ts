import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-add-productos',
  templateUrl: './add-productos.html',
})
export class AddProductos {
  productos: Producto = new Producto();
  private productoService = inject(ProductoService);
  //inyectar un enrutador
  private router = inject(Router);

  onSubmit(form: NgForm) {
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
      next: (data) => {
        this.goListaProducto();
      },
      error: (error) => {
        console.log('Hubo en error al agregar un producto:  ', error);
      },
    });
  }
}
