package zd.inventariobackend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    // En Producto.java (agrega import jakarta.validation.constraints.Size; y Max;)
    @NotBlank(message = "El producto debe tener un NOMBRE obligatorio")
    @Size(min = 3, max = 50, message = "El NOMBRE debe tener entre 3 y 50 caracteres")
    @Column(nullable = false, length = 50)
    private String name;

    @NotBlank(message = "El producto debe tener una DESCRIPCION obligatoria")
    @Size(min = 5, max = 70, message = "La DESCRIPCION debe tener entre 5 y 70 caracteres")
    @Column(nullable = false, length = 70)
    private String descripcion;

    @NotNull(message = "El PRECIO no puede ser nulo")
    @Positive(message = "El PRECIO debe ser mayor a 0")
    @Column(nullable = false, precision = 10, scale = 2)
    //SE cambio de double a big decimal para evitar errores
    private BigDecimal price;

    @NotNull(message = "El STOCK no puede ser nulo")
    @PositiveOrZero(message = "El STOCK debe ser un valor POSITIVO")
    @Column(nullable = false)
    Integer stock;
}
