import { Component, OnInit } from '@angular/core';
import { interval, concat, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  finalObservable;

  constructor() { }

  ngOnInit(): void {

    const videoFeedInterval1 = interval(1000)
      .pipe(map(eachVideo => `tech video ${eachVideo}`), take(5));;

    const videoFeedInterval2 = interval(2000)
      .pipe(map(eachVideo => `comedy video ${eachVideo}`), take(5));


    const videoFeedInterval3 = interval(3000)
      .pipe(map(eachVideo => `news video ${eachVideo}`), take(5));



    this.finalObservable = merge(videoFeedInterval1, videoFeedInterval2, videoFeedInterval3);

  }

  mergeAll() {
    this.finalObservable.subscribe(videos => {
      console.log(videos)
    })
  }

}
