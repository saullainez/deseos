import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[] = [];
  constructor(public deseosService: DeseosService, private router:Router, private alertController: AlertController) {
    this.listas = this.deseosService.getLists();
  }

  async agregarLista(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: (data) => {
            if(data.title.length === 0){
              return
            }else{
              const listaId = this.deseosService.crearLista(data.title);
              this.router.navigateByUrl(`tabs/tab1/agregar/${listaId}`);
            }
          }
        },
      ]
    });

    alert.present();
  }

  listaSeleccionada(lista:Lista){
    const idLista = lista.id;
    this.router.navigateByUrl(`tabs/tab1/agregar/${idLista}`);
  }

}
