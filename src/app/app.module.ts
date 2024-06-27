import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BandaComponent } from './components/banda/banda.component';
import { BandasComponent } from './components/bandas/bandas.component';

@NgModule({
  declarations: [
    AppComponent,
    BandaComponent,
    BandasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
