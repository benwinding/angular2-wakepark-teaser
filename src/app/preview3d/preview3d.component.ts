import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {RenderingService} from "./rendering.service";


export class WakeParkItem{
  public name: string;
  public description: string;
  public modelPath: string;
  public thumbPath: string;
}

const WakeParkItems: WakeParkItem[] = [
  {
    name: "Slider 1 Set Up",
    description: "The slider in action mode!",
    modelPath: "./assets/V3-Setup-Lower.stl",
    thumbPath: "./assets/V3-Setup-Lower.png"
  },
  {
    name: "Slider 1 Packed Up",
    description: "The modular slider in it's packed up state",
    modelPath: "./assets/V3-PackedUp-Lower.stl",
    thumbPath: "./assets/V3-PackedUp-Lower.png"
  },
];

@Component({
  selector: 'app-preview3d',
  template: `
  <h1>{{title}}</h1>
  <div class="ui-g">
    <div *ngFor="let wakeItem of wakeItems" 
    [class.selected]="wakeItem === selectedWakeItem" 
    (click)="onSelect(wakeItem)"
    class="badge ui-g-3"
    >    
      <h3>{{wakeItem.name}}</h3> 
      <p>{{wakeItem.description}}</p>
      <img src="./../.{{wakeItem.thumbPath}}"/>
    </div>
  </div>
  <div *ngIf="selectedWakeItem" class="ui-g">
    <h2>Current Selection: {{selectedWakeItem.name}}</h2>
  </div>  
  <div class="ui-g">
    <p-checkbox [(ngModel)]="isAutoRotating" binary="true" (onChange)="toggleAutoRotate($event)"></p-checkbox>
    Auto Rotate: 
    <div *ngIf="isAutoRotating">
      Enabled
    </div>  
    <div *ngIf="!isAutoRotating">
      Disabled
    </div>  
  </div>
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .badge img{
      width: 100%;
    }
    .badge {
      background-color: #BBD8DC;
      color: white;
      border: solid #607D8B;
    }
  `]
})
export class Preview3dComponent implements OnInit, OnDestroy {
  title: string = "3D Wake Previewer";
  wakeItems: WakeParkItem[] = WakeParkItems;
  selectedWakeItem: WakeParkItem;
  isAutoRotating: boolean = true;
  
  constructor(
    private renderingService: RenderingService
  ){}

  @Input()
  public container: HTMLElement;

  ngOnInit() {
    this.renderingService.InitRender(this.container);
  }

  ngOnDestroy(): void {
    if(this.selectedWakeItem)
      this.renderingService.UnLoadStlIntoPreivew(this.selectedWakeItem.modelPath);
  }

  onSelect(itemJustSelected: WakeParkItem){
    if(this.selectedWakeItem)
      this.renderingService.UnLoadStlIntoPreivew(this.selectedWakeItem.modelPath);
    this.selectedWakeItem = itemJustSelected;
    this.renderingService.LoadStlIntoPreivew(this.selectedWakeItem.modelPath, 1/1000, 0,0,2, 0xf4a460);
  }
  
  toggleAutoRotate(event: any){
    this.renderingService.toggleAutoRotate();
  }
}
