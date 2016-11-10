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
import {TabViewModule} from "primeng/primeng";
import {AccordionModule} from "primeng/primeng";
import {ButtonModule} from "primeng/components/button/button";
import {ThreeSceneService} from "./preview3d/three-scene.service";
import {ThreeRenderService} from "./preview3d/three-render.service";
import {TabMenuModule} from "primeng/components/tabmenu/tabmenu";
import {PreviewRenderContainerComponent} from "./preview3d/preview-render-container.component";
import { EventDetailsPageComponent } from './event-details-page/event-details-page.component';
import { ParkPreviewPageComponent } from './park-preview-page/park-preview-page.component';
import {routing, appRoutingProviders} from "./app.routing";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {RenderingService} from "./preview3d/rendering.service";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4mNT9idnzqmKFvioFe2FFElACpprUBH4',
    }),
    routing,
    TabViewModule,
    AccordionModule,
    ButtonModule,
    TabMenuModule,
    CheckboxModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    DayshoursPipe,
    Preview3dComponent,
    GoogleMapPreviewComponent,
    PreviewRenderContainerComponent,
    EventDetailsPageComponent,
    ParkPreviewPageComponent
  ],
  providers: [
    appRoutingProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ThreeSceneService,
    ThreeRenderService,
    RenderingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
