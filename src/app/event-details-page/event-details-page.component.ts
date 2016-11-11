import { Component, OnInit } from '@angular/core';
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {DayshoursPipe} from "../dayshours.pipe";

@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.css'],
  providers: [DayshoursPipe]
})
export class EventDetailsPageComponent implements OnInit {
  
  private remainingTime: number;
  private location: string;
  private eventDate: number = Date.UTC(2017,0,26);
  
  ngOnInit() {
    var time_future = this.eventDate;
    var time_now: any = Date.now();
    var remainingMillis = time_future - time_now;
    this.remainingTime = Math.round(remainingMillis / 1000);
    
    this.location = "Corny Point, South Australia";
    
    IntervalObservable.create(1000).subscribe(n => this.remainingTime = this.remainingTime - 1);
  }
}
