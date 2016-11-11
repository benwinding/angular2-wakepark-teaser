import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/components/common/api";

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="tabMenuContainer">
      <p-tabMenu [model]="items"></p-tabMenu>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit{
  private items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {label: 'Event Info', routerLink: ["/eventDetails"], icon: "fa-map"},
      {label: 'Park Preview', routerLink: ["/parkPreview"], icon: "fa-cubes"}
    ]
  }
}
