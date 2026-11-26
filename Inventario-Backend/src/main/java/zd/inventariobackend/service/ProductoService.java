package zd.inventariobackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zd.inventariobackend.exceptions.ProductoNotFoundException;
import zd.inventariobackend.model.Producto;
import zd.inventariobackend.repository.IProductoRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
//Asegura que un conjunto de operaciones en la base de datos se ejecuten bajo el principio ACID (Atomicidad,
// Consistencia, Aislamiento y Durabilidad): o todas se aplican con éxito (haciendo un commit), o si ocurre un error,
// se revierte todo (haciendo un rollback) para evitar datos incompletos o corruptos.
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepository productoRepository;


    @Override
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    @Override
    public Producto findById(Integer id) {
        return productoRepository.findById(id).orElseThrow(() -> new ProductoNotFoundException(id));
    }

    @Override
    @Transactional
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    @Transactional
    public void delete(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new ProductoNotFoundException(id);
        }
        productoRepository.deleteById(id);
    }
}