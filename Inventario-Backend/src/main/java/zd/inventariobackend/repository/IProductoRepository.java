package zd.inventariobackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zd.inventariobackend.model.Producto;


public interface IProductoRepository  extends JpaRepository <Producto,Integer> {
}
