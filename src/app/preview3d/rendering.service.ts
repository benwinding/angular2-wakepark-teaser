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

  public container: HTMLElement;
  public camera: PerspectiveCamera;
  public controls: OrbitControls;

  private IsPackedUp: boolean = true;
  private pathSetUp: string = './assets/V3-Setup-Lower.stl';
  private pathPackedUp: string = './assets/V3-PackedUp-Lower.stl';

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

    this.sceneService.addStlToScene(this.pathSetUp, 1/1000, 0,0,2, 0xf4a460);
    this.sceneService.addStlToScene('./assets/manSmall.stl', 1/90, 2,-0.05,3, 0x800000);

    this.animate();
  }

  onClickSwitch(){
    if(this.IsPackedUp){
      this.sceneService.removeFromScene(this.pathSetUp);
      this.sceneService.addStlToScene(this.pathPackedUp, 1/1000, 0,0,2, 0xf4a460);
    }
    else{
      this.sceneService.removeFromScene(this.pathPackedUp);
      this.sceneService.addStlToScene(this.pathSetUp, 1/1000, 0,0,2, 0xf4a460);
    }
    this.IsPackedUp = !this.IsPackedUp;
  }

  public onWindowResize() {
    const width = window.innerWidth-5;
    const height = width * 0.72;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderService.renderer.setSize(width, height);
  }

  public animate() {
    window.requestAnimationFrame(_ => this.animate());
    this.render();
  }

  render() {
    this.controls.update();
    this.renderService.renderer.render( this.sceneService.scene, this.camera );
  }

}
