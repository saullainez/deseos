import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  listas: Lista[] = [];
  @Input() terminada;
  constructor(public deseosService: DeseosService, private router:Router, private alertController: AlertController) { 
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

  async editarLista(lista:Lista){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: lista.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (data) => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if(data.title.length === 0){
              return
            }else{
              lista.title = data.title;
              this.deseosService.guardarStorage();
              this.lista.closeSlidingItems();
            }
          }
        },
      ]
    });

    alert.present();
  }

}
