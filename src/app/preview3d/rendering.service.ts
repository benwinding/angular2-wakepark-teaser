import {Injectable, Inject} from "@angular/core";
import {ThreeSceneService} from "./three-scene.service";
import {ThreeRenderService} from "./three-render.service";
import PerspectiveCamera = THREE.PerspectiveCamera;
import OrbitControls = THREE.OrbitControls;
/**
 * Created by ben on 10/11/16.
 */

@Injectable()
export class RenderingService{
  constructor(
    @Inject(ThreeSceneService) private sceneService: ThreeSceneService,
    @Inject(ThreeRenderService) private renderService: ThreeRenderService
  ) { }

  private container: HTMLElement;
  private camera: PerspectiveCamera;
  private controls: OrbitControls;
  private viewRatio: number = 0.77;

  InitRender(inputContainer: HTMLElement) {
    this.container = inputContainer;
    this.camera = new THREE.PerspectiveCamera(35 , this.container.clientWidth/this.container.clientHeight, 1, 50 );
    this.camera.position.set( 8, 2, 8 );

    this.container.appendChild( this.renderService.renderer.domElement );

    window.addEventListener( 'resize', _ => this.onWindowResize());

    var controls = new THREE.OrbitControls(this.camera, this.container);
    this.controls = controls;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.06;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.1;
    controls.minDistance = 1;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI/2 - .04; // Don't let camera rotate below ground
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    
    this.sceneService.addStlToScene('./assets/manSmall.stl', 1/90, 2,-0.05,3, 0x800000);
  
    this.onWindowResize();
    this.animate();
  }

  private onWindowResize() {
    const width = this.container.clientWidth-5;
    const height = width * this.viewRatio;
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();
    this.renderService.renderer.setSize(width, height);
  }
  
  private animate() {
    window.requestAnimationFrame(_ => this.animate());
    this.render();
  }

  private render() {
    this.controls.update();
    this.renderService.renderer.render( this.sceneService.scene, this.camera );
  }

  public UnLoadStlIntoPreivew(filePath: string) {
    this.sceneService.removeFromScene(filePath);
  }

  public LoadStlIntoPreivew(filePath: string, scale: number, xpos: number, ypos: number, zpos: number, color: number) {
    this.sceneService.addStlToScene(filePath, scale, xpos, ypos, zpos, color);
  }
  
  public toggleAutoRotate(){
    this.controls.autoRotate = !this.controls.autoRotate;
  }
}
