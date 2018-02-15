import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Wine } from './wine';
import { WINES } from './mock-wines';
import { MessageService } from './message.service';

@Injectable()
export class WineService {

  constructor(private messageService: MessageService) { }

  getWines(): Observable<Wine[]> {
    // Todo: send the message _after_ fetching the wines
    this.messageService.add('WineService: fetched wines');
    return of(WINES);
  }

  getWine(id: number): Observable<Wine> {
  // Todo: send the message _after_ fetching the hero
  this.messageService.add(`WineService: fetched wine id=${id}`);
  return of(WINES.find(wine => wine.id === id));
}
}