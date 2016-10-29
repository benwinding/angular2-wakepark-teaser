import { Component, OnInit } from '@angular/core';
import {DayshoursPipe} from "../dayshours.pipe";
import {Observable} from "rxjs";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DayshoursPipe]
})
export class HeaderComponent implements OnInit {

  private remainingTime: number;
  private location: string;
  
  constructor() { }

  ngOnInit() {
    this.remainingTime = 1000;
    this.location = "Corny Point, South Australia";

    IntervalObservable.create(1000).subscribe(n => this.remainingTime = this.remainingTime - 1);
  }
}
