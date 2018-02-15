import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { WinesComponent } from './wines/wines.component';
import { WineDetailComponent } from './wine-detail/wine-detail.component';
import { WineService } from './wine.service';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WinesComponent,
    WineDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [WineService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
