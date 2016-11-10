import {Component, OnInit, Input} from '@angular/core';
import {RenderingService} from "./rendering.service";


export class WakeParkItem{
  public name: string;
  public description: string;
  public modelPath: string;
}

const WakeParkItems: WakeParkItem[] = [
  {name: "Slider 1 Packed Up", description: "The modular slider in it's packed up state", modelPath: "./assets/V3-PackedUp-Lower.stl"},
  {name: "Slider 1 Set Up", description: "The slider in action mode!", modelPath: "./assets/V3-Setup-Lower.stl"}
  ];


@Component({
  selector: 'app-preview3d',
  template: `
  <h1>{{title}}</h1>
  <ul>
    <li *ngFor="let wakeItem of wakeItems" [class.selected]="wakeItem === selectedWakeItem" (click)="onSelect(wakeItem)">
      <span class="badge">{{wakeItem.name}}</span> {{wakeItem.description}}
    </li>
  </ul>
  <div *ngIf="selectedWakeItem">
    <h2>Current Selection: {{selectedWakeItem.name}}</h2>
  </div>
  `,
  styles: [`
    .badge{
      
    }
  `]
})
export class Preview3dComponent implements OnInit {

  title: string = "3D Wake Previewer";
  wakeItems: WakeParkItem[] = WakeParkItems;
  selectedWakeItem: WakeParkItem;

  constructor(
    private renderingService: RenderingService
  ) {
  }

  @Input()
  public container: HTMLElement;

  ngOnInit() {
    this.renderingService.InitRender(this.container);
  }

  onSelect(itemJustSelected: WakeParkItem){
    if(this.selectedWakeItem != null)
      this.renderingService.UnLoadStlIntoPreivew(this.selectedWakeItem.modelPath);
    this.selectedWakeItem = itemJustSelected;
    this.renderingService.LoadStlIntoPreivew(this.selectedWakeItem.modelPath, 1/1000, 0,0,2, 0xf4a460);
  }
}
