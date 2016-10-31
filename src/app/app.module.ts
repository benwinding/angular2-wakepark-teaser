import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DayshoursPipe } from './dayshours.pipe';
import { Preview3dComponent } from './preview3d/preview3d.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapPreviewComponent } from "./google-map-preview-component/google-map-preview.component";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {AccordionModule} from "primeng/components/accordion/accordion";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DayshoursPipe,
    Preview3dComponent,
    GoogleMapPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4mNT9idnzqmKFvioFe2FFElACpprUBH4'
    }),
    TabViewModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
