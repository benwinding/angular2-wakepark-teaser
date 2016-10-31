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

  constructor() { }

  ngOnInit() {
    var time_future = new Date(2017,2,7).getTime();
    var time_now: any = new Date();
    time_now = time_now;
    var remainingMillis = time_future - time_now;
    this.remainingTime = Math.round(remainingMillis / 1000);

    console.trace("Time future: " + time_future);
    console.trace("Time now: " + time_now);
    console.trace("Remaining: " + this.remainingTime);

    this.location = "Corny Point, South Australia";

    IntervalObservable.create(1000).subscribe(n => this.remainingTime = this.remainingTime - 1);
  }
}
