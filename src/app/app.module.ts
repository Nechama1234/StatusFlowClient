import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusListComponent } from './Components/status-list/status-list.component';
import { TransitionListComponent } from './Components/transition-list/transition-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 



@NgModule({
  declarations: [
    AppComponent,
    StatusListComponent,
    TransitionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
