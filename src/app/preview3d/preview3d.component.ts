import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {RenderingService} from "./rendering.service";
import {WakeParkItem, WakeParkItems} from "./MockWakeParkItems";

@Component({
  selector: 'app-preview3d',
  template: `
  <h2>Slider Catalogue</h2>
  <p>click one of the following previews ... </p>
  <div class="ui-g">
    <div *ngFor="let wakeItem of wakeItems" 
    [class.selected]="wakeItem === selectedWakeItem" 
    (click)="onSelect(wakeItem)"
    class="ui-g-12 ui-lg-6"
    >    
      <div class="ui-g badge">
        <div class="ui-g-8">
          <h3 class="itemName">{{getNameExcerpt(wakeItem, 18)}}...</h3> 
        </div>
        <div class="ui-g-4">
          <div class="itemThumb">        
            <img src="{{wakeItem.thumbPath}}"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div *ngIf="selectedWakeItem" class="ui-g">
    <h2>{{selectedWakeItem.name}}</h2>
    <p>{{selectedWakeItem.description}}</p>    
  </div>  
   `,
  styles: [`
    .ui-g-12 {
      padding: 0.2em;
    }
    div > .selected {
      background-color: #607D8B;
      color: white;
    }
    .itemName{
      position: relative;
      margin: auto;
      padding:0;
    }
    .itemThumb img{
      max-width: 100%;
      height: 3.5em;
    }
    .badge {
      background-color: #EEEEEE;
      color: black;
      border: solid #607D8B;
      border-radius: 10px;
      padding: 0.2em;
    }
    .badge div{
      padding: 0;
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
    this.renderingService.LoadStlIntoPreivew(
      itemJustSelected.modelPath,
      itemJustSelected.modelConfig.scale,
      itemJustSelected.modelConfig.posX,
      itemJustSelected.modelConfig.posY,
      itemJustSelected.modelConfig.posZ,
      itemJustSelected.modelConfig.colour
    );
  }

  public getDescriptionExcerpt(wakeItem: WakeParkItem, charCount: number): string{
    return wakeItem.description.substr(0, charCount);
  }

  public getNameExcerpt(wakeItem: WakeParkItem, charCount: number): string{
    return wakeItem.name.substr(0, charCount);
  }
}
