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
    name: "SliderV3-Active",
    description:
    "This shows the slider in the set-up state. It is made up " +
    "of three separate module which are bolted together using M12 bolts",
    modelPath: "./assets/V3-Setup-Lower.stl",
    thumbPath: "./assets/V3-Setup-Lower.png",
  },
  {
    name: "SliderV3-Transport",
    description:
    "When not being used the slider can be dissasembled into it's transport state. " +
    "The three modules can be unbolted and stacked on top of each other, this provides" +
    "a relatively compact kit which can also house other gear beneath.",
    modelPath: "./assets/V3-PackedUp-Lower.stl",
    thumbPath: "./assets/V3-PackedUp-Lower.png",
  },
];

@Component({
  selector: 'app-preview3d',
  template: `
  <h2>Select Preview</h2>
  <div class="ui-g">
    <div *ngFor="let wakeItem of wakeItems" 
    [class.selected]="wakeItem === selectedWakeItem" 
    (click)="onSelect(wakeItem)"
    class="badge ui-g-6 ui-lg-4"
    >    
      <h4>{{getNameExcerpt(wakeItem, 18)}}...</h4> 
      <p>{{getDescriptionExcerpt(wakeItem, 23)}}...</p>
      <img src="{{wakeItem.thumbPath}}"/>
    </div>
  </div>
  <div *ngIf="selectedWakeItem" class="ui-g">
    <h2>{{selectedWakeItem.name}}</h2>
    <p>{{selectedWakeItem.description}}</p>
  </div>  
   `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .badge img{
      height: 150px;
      max-width: 100%;
    }
    .badge {
      background-color: #BBD8DC;
      color: black;
      border: solid #607D8B;
      border-radius: 10px;
    }
  `]
})
export class Preview3dComponent implements OnInit, OnDestroy {
  wakeItems: WakeParkItem[] = WakeParkItems;
  selectedWakeItem: WakeParkItem;
  
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
  
  public getDescriptionExcerpt(wakeItem: WakeParkItem, charCount: number): string{
    return wakeItem.description.substr(0, charCount);
  }
  
  public getNameExcerpt(wakeItem: WakeParkItem, charCount: number): string{
    return wakeItem.name.substr(0, charCount);
  }
}
