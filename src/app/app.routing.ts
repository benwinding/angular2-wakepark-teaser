/**
 * Created by ben on 6/11/16.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventDetailsPageComponent} from "./event-details-page/event-details-page.component";
import {ParkPreviewPageComponent} from "./park-preview-page/park-preview-page.component";

const appRoutes: Routes = [
  // otherwise redirect to home
  { path: '', redirectTo: 'eventDetails', pathMatch: 'full' },
  { path: 'eventDetails', component: EventDetailsPageComponent},
  { path: 'parkPreview', component: ParkPreviewPageComponent},
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
