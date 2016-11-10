/**
 * Created by ben on 6/11/16.
 */

import {Component, OnInit} from "@angular/core";

@Component({
  selector: "preview-render-container",
  template: `
    <app-preview3d [container]="renderHere"></app-preview3d>
    <div #renderHere></div>
  `
})
export class PreviewRenderContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
