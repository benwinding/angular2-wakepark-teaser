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
    this.scene.fog = new THREE.Fog( 0xffffff, 12, 30 );
  }
  
  public addStlToScene(path: string, scale: number, xpos: number, ypos: number, zpos: number, color: number) {
    var loader = new STLLoader();
    var scene = this.scene;
    loader.load(path, function (geometry) {
      var material = new THREE.MeshPhongMaterial({color: color, specular: 0x111111, shininess: 20});
      var mesh = new THREE.Mesh(geometry, material);
    
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(xpos, ypos, zpos);
    
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    
      scene.add(mesh);
    });
  }
  
}
