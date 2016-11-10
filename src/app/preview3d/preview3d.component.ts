import Camera = THREE.Camera;
import {Component, OnInit, Input} from '@angular/core';
import Renderer = THREE.Renderer;
import Vector3 = THREE.Vector3;
import Scene = THREE.Scene;
import TrackballControls = THREE.TrackballControls;
import OrbitControls = THREE.OrbitControls;
import WebGLRenderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import {ThreeSceneService} from "./three-scene.service";
import {ThreeRenderService} from "./three-render.service";
import {RenderingService} from "./rendering.service";

@Component({
  selector: 'app-preview3d',
  template: `
  <div class="ui-g">
    <div class="ui-g-12">
      <button pbutton type="text" (click)="onClickSwitch()" >Setup/Packup Slider</button>
    </div>
  </div>
  `,
  styles: [`
    div{
      text-align: center;
    }
  `]
})
export class Preview3dComponent implements OnInit {

  constructor(
    private renderingService: RenderingService
  ) { }

  @Input()
  public container: HTMLElement;

  ngOnInit() {
    this.renderingService.InitRender(this.container);
  }

  onClickSwitch(){
    this.renderingService.onClickSwitch();
  }
}
