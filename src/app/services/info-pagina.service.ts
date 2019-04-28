import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  
  info: InfoPagina = {}; //tipo any
  cargada = false; // tipo boolean
  equipo: any[] = [];

  constructor( private http: HttpClient) {
    
    this.cargarInfo();
    this.cargarEquipo();
  }


  private cargarInfo(){
    //Leer el archivo Json
    //definimos donde esta la infor
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => { //con esta fncion de flecha nos traemos la infor de array
        this.cargada= true;
        this.info = resp; //me trae la info como un array
        // console.log(resp);
        
      });
  }

  private cargarEquipo(){
    this.http.get('https://angular-web-2676a.firebaseio.com/equipo.json')
      .subscribe( (resp:any[]) => { //con esta fncion de flecha nos traemos la infor de array
        
        this.equipo = resp; //me trae la info como un array
        // console.log(resp);
    });
  }
  
}
