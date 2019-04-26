import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  
  info: InfoPagina = {}; //tipo any
  cargada = false; // tipo boolean

  constructor( private http: HttpClient) {
    console.log('Servicio de InfoPagina Listo');

    //Leer el archivo Json
    //definimos donde esta la infor
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => { //con esta fncion de flecha nos traemos la infor de array
        
        this.cargada= true;
        this.info = resp; //me trae la info como un array
        console.log(resp);
        
      });

   }
}
