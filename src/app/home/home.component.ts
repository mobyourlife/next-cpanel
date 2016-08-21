import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  sites: any[];

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
    this.sites = [
      { id: 1, title: 'Fanpage de Teste', description: 'Nossa fanpage de testes gerais.' },
      { id: 2, title: 'Mais um teste', description: 'Mais uma fanpage de teste que está mockada.' },
      { id: 3, title: 'Angular 2', description: 'Angular 2 rocks!' },
    ]
  }

}
