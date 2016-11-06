/**
 * Created by ben on 5/11/16.
 */

import {Injectable, Inject} from "@angular/core";
import WebGLRenderer = THREE.WebGLRenderer;
import {ThreeSceneService} from "./three-scene.service";
import OrbitControls = THREE.OrbitControls;

@Injectable()
export class ThreeRenderService{
  constructor(
    @Inject(ThreeSceneService) private sceneService: ThreeSceneService
  ){
    this.init();
  }
  
  public renderer: WebGLRenderer;
  
  private init() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.shadowMapEnabled = true;
    this.renderer.setClearColor( this.sceneService.scene.fog.color );
  }
}
