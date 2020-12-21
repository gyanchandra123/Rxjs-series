import { Component, OnInit } from '@angular/core';
import { concat, interval } from 'rxjs';
import { map, take, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css']
})
export class ConcatComponent implements OnInit {

  finalObservable;

  constructor() { }

  ngOnInit(): void {

    const videoFeedInterval1 = interval(1000)
      .pipe(take(5),map(eachVideo => `tech video ${eachVideo}`) );

    const videoFeedInterval2 = interval(1000)
      .pipe(map(eachVideo => `comedy video ${eachVideo}`), take(5));


    const videoFeedInterval3 = interval(1000)
      .pipe(map(eachVideo => `news video ${eachVideo}`), take(5)); 

    this.finalObservable = concat(videoFeedInterval1, videoFeedInterval2, videoFeedInterval3);
  
  }

  concatAll() {
    this.finalObservable.subscribe(videos => {
      console.log(videos)
    })
  } 
}
