import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/components/common/api";

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <p-tabMenu [model]="items"></p-tabMenu>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {label: 'Event Info', routerLink: ["/eventDetails"]},
      {label: 'Park Preview', routerLink: ["/parkPreview"]}
    ]
  }
}
