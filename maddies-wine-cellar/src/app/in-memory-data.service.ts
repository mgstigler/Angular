import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const wines = [
          {
    id: 1,
    name: 'Maison Bleue',
    vineyard: 'Maison Bleue',
    vintage: '2014',
    description: 'Metis rouge columbia valley: Prosser, Washington',
    grapes: 2
  },
  {
    id: 2,
    name: 'Splendour Cellars',
    vineyard: 'Slendour Cellars',
    vintage: '2016',
    description: 'Presley Pinot Grigio Columbia Valley',
    grapes: 0
  }
    ];
    return {wines};
  }
}