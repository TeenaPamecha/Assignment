import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  @Input()
  interval : number;

  
 

  @Output() onComplete = new EventEmitter();

  public countdown: string;

  private completed: boolean=false;

  constructor() {}

  ngOnInit() {
    this.countdown = this.getTime();
    const countdownObservable1 = timer(1000, 1000).subscribe((val) => {
      this.manipulateInterval();
      this.countdown = this.getTime();
      if (this.interval === 0) {
        this.countdownCompleted();
      }
    });
  }

  private getTime(): string {
    if (this.interval < 0) {
      this.interval = Math.abs(this.interval);
      this.completed = true;
    }
    const hours = Math.floor(this.interval / 3600);
    const minutes = Math.floor((this.interval - hours * 3600) / 60);
    const seconds = this.interval - hours * 3600 - minutes * 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private manipulateInterval() {
    if (this.completed) {
      this.completed = true;
      this.onComplete.emit({stop:true});
      // this.interval++;
    } else {
      this.interval--;
      this.onComplete.emit({stop:false});
    }
  }

  countdownCompleted() {
    this.completed = true;
    this.interval=0;
    this.onComplete.emit({stop:true});
  }
}
