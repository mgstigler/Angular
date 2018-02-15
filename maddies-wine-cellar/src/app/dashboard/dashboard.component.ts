import { Component, OnInit } from '@angular/core';
import { Wine } from '../wine';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  wines: Wine[] = [];

  constructor(private wineService: WineService) { }

  ngOnInit() {
    this.getWines();
  }

  getWines(): void {
    this.wineService.getWines()
      .subscribe(wines => this.wines = wines.slice(1, 5));
  }
}