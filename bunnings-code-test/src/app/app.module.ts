import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CSVReaderService } from 'src/services/CSVReaderService';
import { CSVWriteService } from 'src/services/CSVWriteService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CSVReaderService, CSVWriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
