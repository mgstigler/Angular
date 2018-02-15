import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


import { AppComponent } from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { WinesComponent } from './wines/wines.component';
import { WineDetailComponent } from './wine-detail/wine-detail.component';
import { WineService } from './wine.service';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { WineSearchComponent } from './wine-search/wine-search.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WinesComponent,
    WineDetailComponent,
    WineSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [WineService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
