import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 
    const lista1 = new Lista('Test 1');
    const lista2 = new Lista('Test 2');
    this.listas.push(lista1, lista2);
  }

  getLists():Lista[]{
    return this.listas;
  }
}
