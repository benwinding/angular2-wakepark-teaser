/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DayshoursPipe } from './dayshours.pipe';

describe('Pipe: Dayshours', () => {
  it('create an instance', () => {
    let pipe = new DayshoursPipe();
    expect(pipe).toBeTruthy();
  });
  
  it('test just seconds', () => {
    let pipe = new DayshoursPipe();
    var result = pipe.getSecondsLeft(10);
    expect(result).toBe(10);
  })
  
  it('test just seconds', () => {
    let pipe = new DayshoursPipe();
    var result = pipe.getSecondsLeft(69);
    expect(result).toBe(9);
  })
  
  it('test just 69 seconds', () => {
    let pipe = new DayshoursPipe();
    var result = pipe.getMinutesLeft(69);
    expect(result).toBe(1);
  })
  
  it('test just 54 minutes', () => {
    let pipe = new DayshoursPipe();
    var result = pipe.getMinutesLeft(54*60);
    expect(result).toBe(54);
  })
  
  it('test just 13 hours', () => {
    let pipe = new DayshoursPipe();
    var result = pipe.getHoursLeft(13*60*60);
    expect(result).toBe(13);
  })
  
  it('test just 45 days', () => {
    let pipe = new DayshoursPipe();
    var result = pipe.getDaysLeft(45*60*60*24);
    expect(result).toBe(45);
  })
});
