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

@Component({
  selector: 'app-preview3d',
  templateUrl: './preview3d.component.html',
  styleUrls: ['./preview3d.component.css']
})
export class Preview3dComponent implements OnInit {

  constructor(
    private sceneService: ThreeSceneService,
    private renderService: ThreeRenderService
  ) { }

  @Input()
  public container: HTMLElement;
  public camera: PerspectiveCamera;
  public controls: OrbitControls;

  private IsPackedUp: boolean = true;
  private pathSetUp: string = './assets/V3-Setup-Lower.stl';
  private pathPackedUp: string = './assets/V3-PackedUp-Lower.stl';

  ngOnInit() {
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
