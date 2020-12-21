import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DesignUtilityServiceService } from '../design-utility-service.service';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css']
})
export class ReplaySubjectComponent implements OnInit {

  videoAgroup1 = [];
  videoAgroup2 = [];
  subscribeToggle2: boolean = false;
  replaySubject;
  subscribe2: Subscription;
  subscribe3: Subscription;
  subscribeToggle3: boolean = false;
  videoAgroup3 = [];
  

  constructor(private _utilityService: DesignUtilityServiceService) { }


  ngOnInit(): void {
    this.replaySubject = this._utilityService.subject3;
    this.replaySubject.subscribe((allVideo: any) => {
      return this.videoAgroup1.push(allVideo)
    })
  }

  addVideo(input: any) {
    this._utilityService.subject3.next(input.value);
    console.log(input.value);
  }

  //2nd column video feed:

  subscribeVideo2() {

    this.subscribeToggle2 = !this.subscribeToggle2;

    if (this.subscribeToggle2) {
      this.subscribe2 = this.replaySubject.subscribe((allVideo: any) => {
        return this.videoAgroup2.push(allVideo)
      })
    } else {
      this.subscribe2.unsubscribe();
    }
  }

  //3rd column video feed:

  subscribeVideo3() {

    this.subscribeToggle3 = !this.subscribeToggle3;

    if (this.subscribeToggle3) {
      this.subscribe3 = this.replaySubject.subscribe((allVideo: any) => {
        return this.videoAgroup3.push(allVideo)
      })
    } else {
      this.subscribe3.unsubscribe();
    }
  }

}
