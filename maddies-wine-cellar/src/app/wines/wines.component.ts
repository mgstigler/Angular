import { Component, OnInit } from '@angular/core';
import { Wine } from '../wine';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.css']
})
export class WinesComponent implements OnInit {
  wines : Wine[];


  constructor(private wineService: WineService) { }

  ngOnInit() {
     this.getWines();
  }

  getWines(): void {
    this.wineService.getWines()
    .subscribe(wines => this.wines = wines);
  }

}
