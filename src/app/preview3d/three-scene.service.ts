/**
 * Created by ben on 5/11/16.
 */

import {Injectable} from "@angular/core";
import Scene = THREE.Scene;
var STLLoader = require('three-stl-loader')(THREE);

@Injectable()
export class ThreeSceneService{
  constructor(){
    this.Init();
  }

  public scene: Scene;

  private Init() {
    this.scene = new THREE.Scene();
    // Fog
    this.scene.fog = new THREE.Fog( 0xffffff, 12, 30 );

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
    
    // Lights
    this.scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    this.addShadowedLight( 10, 10, 10, 0xffffff, 1.35 );
    this.addShadowedLight( 5, 10, -10, 0xffaa00, 1 );
  }

  private addShadowedLight( x, y, z, color, intensity ) {
    
    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    this.scene.add( directionalLight );
    
    directionalLight.castShadow = true;
    
    directionalLight.shadow.mapSize.width = 30;
    directionalLight.shadow.mapSize.height = 30;
    directionalLight.shadow.bias = -0.005;
  }

  public addStlToScene(path: string, scale: number, xpos: number, ypos: number, zpos: number, color: number) {
    var loader = new STLLoader();
    var scene = this.scene;
    console.trace("STL: Adding " + path);
    loader.load(path, function (geometry) {
      var material = new THREE.MeshPhongMaterial({color: color, specular: 0x111111, shininess: 20});
      var mesh = new THREE.Mesh(geometry, material);

      mesh.scale.set(scale, scale, scale);
      mesh.position.set(xpos, ypos, zpos);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = path;
      scene.add(mesh);
    });
  }

  public removeFromScene(meshName: string) {
    var children = this.scene.children
    console.trace("STL: Removing " + meshName);
    for(var i=0; i< children.length; i++){
      if(children[i].name == meshName){
        children.splice(i, 1);
        break;
      }
    }
  }
}
