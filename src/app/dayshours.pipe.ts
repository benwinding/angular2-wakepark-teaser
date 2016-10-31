import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayshours'
})
export class DayshoursPipe implements PipeTransform {
  transform(totalSecondsLeft: number, args?: any): any {
    var secondsLeft: number = this.getSecondsLeft(totalSecondsLeft);
    var minutesLeft: number = this.getMinutesLeft(totalSecondsLeft);
    var hoursLeft: number = this.getHoursLeft(totalSecondsLeft);
    var daysLeft: number = this.getDaysLeft(totalSecondsLeft);

    return daysLeft + " Days, " +
      hoursLeft + " Hours, " +
      minutesLeft + " Minute, " +
      secondsLeft + " Seconds";
  }

  getSecondsLeft(totalSecondsLeft: number): number{
    return totalSecondsLeft % 60;
  }

  getMinutesLeft(totalSecondsLeft: number): number{
    return Math.floor((totalSecondsLeft % (60 * 60)) / 60);
  }

  getHoursLeft(totalSecondsLeft: number): number{
    return Math.floor((totalSecondsLeft % (60 * 60 * 60)) / (60 * 60));
  }

  getDaysLeft(totalSecondsLeft: number): number{
    return Math.floor(totalSecondsLeft / (60 * 60 * 24));
  }
}
