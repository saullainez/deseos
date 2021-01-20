import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  listas: Lista[] = [];
  @Input() terminada = true;
  constructor(public deseosService: DeseosService, private router:Router) { 
    this.listas = this.deseosService.getLists();
  }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    const idLista = lista.id;
    const tab = this.terminada ? 'tab2' : 'tab1'; 
    this.router.navigateByUrl(`tabs/${tab}/agregar/${idLista}`);
  }

  borrarLista(lista:Lista){
    this.deseosService.borrarLista(lista);
    this.listas = this.deseosService.getLists();
  }

}
