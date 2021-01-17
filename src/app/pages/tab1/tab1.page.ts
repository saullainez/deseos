import { Component } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[] = [];
  constructor(public deseosService: DeseosService) {
    this.listas = this.deseosService.getLists();
    console.log(this.listas);
  }

}
