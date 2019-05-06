import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service'; //para acceder al servicio de productos
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;

  constructor( private route: ActivatedRoute,
                public ProductosService:ProductosService) { }

  ngOnInit() {

          // Con esto todo el id del producto que se encuentra en la url
        this.route.params
            .subscribe( parametros  =>{
              // console.log(parametros);
              //asi llamamos al servicio peropara ejecutar colocamos el subcribe
                this.ProductosService.getProducto(parametros['id'])
                  .subscribe((producto:ProductoDescripcion) =>{
                     this.id = parametros['id'];
                     this.producto = producto; //para setiar las propiedades al producto
                  // console.log(producto);


                  }); 
              
            });

  }

}
