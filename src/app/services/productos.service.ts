import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos : Producto[] = [];
  productosFiltrados : Producto[] = [];
  


  constructor( private http:HttpClient) { 
    this.cargarProductos();

  }

  private cargarProductos(){
  
    return new Promise ( (resolve, reject) =>{
     
      this.http.get('https://angular-web-2676a.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) =>{
        this.productos = resp;
        // console.log(resp);
        this.cargando = false;  
        resolve();
    });
      
    });

    
  }

    getProducto(id: string) {

    //no usamos el suscribe por que necesitamos todos los datos que estan en este json
    return this.http.get(`https://angular-web-2676a.firebaseio.com/productos/${ id }.json`)
      
  }

    buscarProducto( termino: string){
      
      if( this.productos.length === 0){
          //Esperar a q esten cargados los productos
          this.cargarProductos().then( ()=> {
          //Ejecutar despues de tener los productos
          //Aplicar Filtro
          this.filtrarProductos( termino );
          });

      }else{
        //Aplicar Filtro
        this.filtrarProductos( termino );
      }

      // this.productosFiltrados = this.productos.filter( producto =>{
      //   return true;
      // });
      
      // console.log(this.productosFiltrados);
    }

    private filtrarProductos( termino: string) {
      
      console.log(this.productos);
      this.productosFiltrados = [];

      termino = termino.toLocaleLowerCase();

      this.productos.forEach( prod => {
        
        const tituloLower = prod.titulo.toLocaleLowerCase();

        if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ){
          this.productosFiltrados.push(prod);
        }

      });



    }
}
