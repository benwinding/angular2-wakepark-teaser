import { Component, OnInit } from '@angular/core';
import {DayshoursPipe} from "../dayshours.pipe";
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
  private eventDate: number = Date.UTC(2017,0,26);

  constructor() { }

  ngOnInit() {
    var time_future = this.eventDate;
    var time_now: any = Date.now();
    var remainingMillis = time_future - time_now;
    this.remainingTime = Math.round(remainingMillis / 1000);

    this.location = "Corny Point, South Australia";

    IntervalObservable.create(1000).subscribe(n => this.remainingTime = this.remainingTime - 1);
  }
}