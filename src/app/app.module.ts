import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DayshoursPipe } from './dayshours.pipe';
import { Preview3dComponent } from './preview3d/preview3d.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DayshoursPipe,
    Preview3dComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
