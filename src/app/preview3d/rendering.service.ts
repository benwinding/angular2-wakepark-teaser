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

  InitRender(inputContainer: HTMLElement) {
    this.container = inputContainer;
    this.camera = new THREE.PerspectiveCamera(35 , window.innerWidth/window.innerHeight , 1, 50 );
    this.camera.position.set( 8, 2, 8 );

    this.container.appendChild( this.renderService.renderer.domElement );

    window.addEventListener( 'resize', _ => this.onWindowResize());

    var controls = new THREE.OrbitControls(this.camera, this.container);
    this.controls = controls;
    controls.autoRotate = true; // turn on auto rotate
    controls.autoRotateSpeed = 0.06; // speed of auto rotate
    controls.enableDamping = true; // add inertia
    controls.dampingFactor = 0.1; // inertia dampening
    controls.rotateSpeed = 0.1; // set rotation sensitivity
    controls.minDistance = 1; // minimum zoom
    controls.maxDistance = 20; // maximum zoom
    controls.maxPolarAngle = Math.PI/2 - .04; // Don't let camera rotate below ground
    controls.target.set(0, 0, 0); // Adjust camera look at target to center on building height
    controls.enableZoom = false;
    
    this.sceneService.addStlToScene('./assets/manSmall.stl', 1/90, 2,-0.05,3, 0x800000);

    this.animate();
  }

  private onWindowResize() {
    const width = window.innerWidth-5;
    const height = width * 0.72;
    this.camera.aspect = width / height;
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
