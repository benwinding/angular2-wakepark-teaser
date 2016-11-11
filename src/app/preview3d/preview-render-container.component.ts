/**
 * Created by ben on 6/11/16.
 */

import {Component, OnInit} from "@angular/core";
import {RenderingService} from "./rendering.service";

@Component({
  selector: "preview-render-container",
  template: `
    <div class="ui-g">
      <div class="ui-g-12 ui-md-6 ui-lg-5">
        <app-preview3d [container]="renderHere"></app-preview3d>
      </div>
      <div class="ui-g-12 ui-md-7 ui-lg-7">
        <h2>3D Preview Window    </h2>
        <p-checkbox [(ngModel)]="isAutoRotating" binary="true" (onChange)="toggleAutoRotate($event)"></p-checkbox>
        Auto Rotate: {{isAutoRotating}}
        <div #renderHere></div>
    </div>
    </div>
  `
})
export class PreviewRenderContainerComponent {
  constructor(
    private renderingService: RenderingService
  ){}

  isAutoRotating: boolean = true;

  toggleAutoRotate(event: any){
    this.renderingService.toggleAutoRotate();
  }
}
