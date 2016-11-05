import Camera = THREE.Camera;
import {Component, OnInit, Input} from '@angular/core';
import Renderer = THREE.Renderer;
import Vector3 = THREE.Vector3;
import Scene = THREE.Scene;
import TrackballControls = THREE.TrackballControls;
import OrbitControls = THREE.OrbitControls;
import WebGLRenderer = THREE.WebGLRenderer;
var STLLoader = require('three-stl-loader')(THREE);

@Component({
  selector: 'app-preview3d',
  templateUrl: './preview3d.component.html',
  styleUrls: ['./preview3d.component.css']
})
export class Preview3dComponent implements OnInit {

  constructor() { }

  @Input()
  container: HTMLElement;
  camera: Camera;
  scene: Scene;
  renderer: WebGLRenderer;
  controls: OrbitControls;

  ngOnInit() {
    this.Init();
  }

  private IsPackedUp: boolean = true;

  addStlToScene(path: string){
    var loader = new STLLoader();
    var scene = this.scene;
    loader.load( path,  function (geometry){
      var material = new THREE.MeshPhongMaterial( { color: 0xf4a460, specular: 0x111111, shininess: 20 } );
      var mesh = new THREE.Mesh( geometry, material );

      var scale = 1/1000;
      mesh.scale.set(scale,scale,scale);
      mesh.position.setZ( -2 );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add( mesh );
    });
  }

  onClickSwitch(){
    this.scene.children.pop();
    if(this.IsPackedUp)
      this.addStlToScene('./assets/V3-Setup.stl');
    else
      this.addStlToScene('./assets/V3-PackedUp-Lower.stl');

    this.IsPackedUp = !this.IsPackedUp;
  }

  Init(){
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight , 1, 50 );
    this.camera.position.set( 8, 2, 8 );

    var scene = new THREE.Scene();
    this.scene = scene;

    // Fog
    scene.fog = new THREE.Fog( 0xffffff, 8, 30 );

    // Ground
    var planeMat = new THREE.MeshPhongMaterial();
    planeMat.color.setRGB(0,0,0.8);

    var plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 100, 100 ),
      planeMat
    );

    plane.rotation.x = -Math.PI/2;
    plane.position.y = 0;

    plane.castShadow = true;
    plane.receiveShadow = true;

    this.scene.add( plane );

    this.scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

    this.addShadowedLight( 10, 10, 10, 0xffffff, 1.35 );
    this.addShadowedLight( 5, 10, -10, 0xffaa00, 1 );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.shadowMapEnabled = true;
    this.renderer.setClearColor( scene.fog.color );

    this.container.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', this.onWindowResize, false );
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

    this.addStlToScene('./assets/V3-PackedUp-Lower.stl');

    this.animate();
  }

  addShadowedLight( x, y, z, color, intensity ) {

    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    this.scene.add( directionalLight );

    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 30;
    directionalLight.shadow.mapSize.height = 30;

    directionalLight.shadow.bias = -0.005;
  }

  onWindowResize() {

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  public animate() {

    window.requestAnimationFrame(_ => this.animate());

    this.render();

  }

  render() {

    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }
}
