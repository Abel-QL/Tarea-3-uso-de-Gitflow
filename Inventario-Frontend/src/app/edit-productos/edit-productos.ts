import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-edit-productos',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-productos.html',
})
export class EditProductos implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!: number;

  // Creo el formulario del componente. Es un "grupo" que contiene los 4 campos
  // y se conecta al HTML con [formGroup]="form".
  // "fb" es el FormBuilder: una ayuda de Angular para crear formularios con menos código.
  // "nonNullable" hace que los campos nunca sean null (si los vacías, vuelven a
  // su valor inicial, '' o 0). Así TypeScript sabe que name es siempre un string.
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    descripcion: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProductoById(this.id).subscribe({
      next: (data) => this.form.patchValue(data),
      error: (error) => console.error('Error al cargar el producto:', error),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.productoService
      .editProducto(this.id, { id: this.id, ...this.form.getRawValue() })
      .subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (error) => console.error('Error al editar el producto:', error),
      });
  }
}
